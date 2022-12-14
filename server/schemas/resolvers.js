const { AuthenticationError } = require('apollo-server-express');
const { User, Group, Listing, Swap, Message, Comment } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                // const token = Auth.getProfile();
                // const myId = token.data._id;
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('groups')
                    .populate('listings')
                    .populate('activeSwaps')
                    .populate('messages');
                return userData;
            };

            throw new AuthenticationError('Must be logged in to do that');
        },
        user: async (parent, { _id }) => {
            return User.findOne({ _id })
                .select('-__v -password')
                .populate('listings')
                .populate('groups')
        },
        users: async (parent, args, context) => {
            return User.find()
                .select('-__v, -password');
        },
        group: async (parent, { _id }) => {
            return Group.findOne({ _id })
                .populate('listings')
                .populate('owners')
                .populate('users');
        },
        groups: async () => {
            return Group.find()
                .populate('listings')
                .populate('users')
                .populate('owners')
                .populate('admins');
        },
        groupsPublic: async () => {
            return Group.find({ isPublic: true })
                .populate('admins');
        },
        listing: async (parent, { _id }) => {
            const listing = await Listing.findOne({ _id })
                .populate('creator');

                return listing;
        },
        listingsDisplay: async (parent, { groupId }) => {
            const group = await Group.findOne({ _id: groupId });

            let listingsDisplay = [];

            for (i = 0; i < group.listings.length; i++) {
                const listingToAdd = await Listing.findOne(
                    { _id: group.listings[i] }
                ).populate('creator');

                listingsDisplay.push(listingToAdd);
            };

            return listingsDisplay;
        },
        swap: async (parent, { _id, groupName }, context) => {
            const dbSwap = await Swap.findOne({ _id })
                .populate('proposerListings')
                .populate('responderListings')
                .populate('swapMessage')
                .populate('group');

            if (context.user._id === dbSwap.proposer || context.user._id === dbSwap.responder) {
                return dbSwap;
            };

            const dbGroup = await Group.findOne({ groupName })
                .populate('admins');
            
            const adminView = dbGroup.admins.find(admin => admin === context.user._id);
            
            if (adminView) {
                return dbSwap;
            };

            throw new AuthenticationError('Must be logged in as a relevant user to do that');
        },
        message: async (parent, { _id, groupName }, context) => {
            const dbMessage = await Message.findOne({ _id })
                .populate('comments');
               
            
            if (context.user._id === dbMessage.sender || context.user._id === dbMessage.receiver) {
                return dbMessage;
            };

            const dbGroup = await Group.findOne({ groupName })
                .populate('admins');

            const adminView = dbGroup.admins.find(admin => admin === context.user._id);

            if (adminView) {
                return dbMessage;
            };

            throw new AuthenticationError('Must be logged in as a relevant user to do that');
        }
    },

    Mutation: {
        createUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect login credentials');
            };

            const correctPassword = await user.isCorrectPassword(password);

            if (!correctPassword) {
                throw new AuthenticationError('Incorrect login credentials');
            };

            const token = signToken(user);
            return { token, user };
        },
        updateUser: async (parent, args, context) => {
            if (context.user) {
                let updateArgs = args;
                delete updateArgs._id;

                const updateUser = await User.findOneAndUpdate(
                    { _id: args._id },
                    { updateArgs },
                    { new: true }
                );

                return updateUser;
            };

            throw new AuthenticationError('You need to be logged in!');
        },
        updateUserGroups: async (parent, args, context) => {
            // if (context.user) {
                let userId;

                    if (args._id) {
                        userId = args._id;
                    } else {
                        userId = context.user._id;
                    };

                if (args.groups) {

                    const updateUser = await User.findOneAndUpdate(
                        { _id: userId },
                        { $addToSet: { groups: args.groups } },
                        { new: true }
                    );

                    await Group.findOneAndUpdate(
                        { _id: args.groups },
                        { $addToSet: { users: args._id } }
                    );

                    return updateUser;
                };

                if (args.removeGroups) {
                    const updateUser = await User.findOneAndUpdate(
                        { _id: userId },
                        { $pull: { groups: args.removeGroups } },
                        { new: true }
                    );

                    await Group.findOneAndUpdate(
                        { _id: args.removeGroups },
                        { $pull: { users: updateUser._id } }
                    );

                    return updateUser;
                };
            // };

            // throw new AuthenticationError('You need to be logged in!');
        },
        deleteUser: async (parent, { _id }, context) => {
            if (context.user) {
                const deleteUser = await User.findOneAndDelete(
                    { _id: _id }
                );

                // remove from any Groups
                if (deleteUser.groups.length > 0) {
                    for (i = 0; i < deleteUser.groups.length; i++) {
                        await Group.findOneAndUpdate(
                            { _id: deleteUser.groups[i]._id },
                            { $pull: { users: _id } }
                        );
                    };
                };

                // delete associated Listings
                if (deleteUser.listings.length > 0) {
                    for (i = 0; i < deleteUser.listings.length; i++) {
                        // delete the user's listings
                        const deleteListing = await Listing.findOneAndDelete(
                            { _id: deleteUser.listings[i]._id }
                        );
                    
                        // delete the listings from their associated group
                        await Group.findOneAndUpdate(
                            { _id: deleteListing.group._id },
                            { $pull: { listings: deleteListing._id } }
                        );
                    };
                };
                
                // delete associated messages
                if (deleteUser.messages.length > 0) {
                    for (i = 0; i < deleteUser.messages.length; i++) {
                        // delete the user's messages
                        const deleteMessage = await Message.findOneAndDelete(
                            { _id: deleteUser.messages[i]._id }
                        );

                        // delete message from the other user's array
                        if (deleteMessage.sender === _id) {
                            await User.findOneAndUpdate(
                                { _id: deleteMessage.receiver },
                                { $pull: { messages: deleteMessage._id } }
                            );
                        } else {
                            await User.findOneAndUpdate(
                                { _id: deleteMessage.sender },
                                { $pull: { messages: deleteMessage._id } }
                            );
                        };
                    };
                };

                // delete associated swaps
                if (deleteUser.swaps.length > 0) {
                    for (i = 0; i < deleteUser.swaps.length; i++) {
                        // delete the user's swaps
                        const deleteSwap = await Swap.findOneAndDelete(
                            { _id: deleteUser.activeSwaps[i] }
                        );

                        // delete swap from the other user's array
                        if (deleteSwap.proposer === _id) {
                            await User.findOneAndUpdate(
                                { _id: deleteSwap.responder },
                                { $pull: { activeSwaps: deleteSwap._id } }
                            );
                        } else {
                            await User.findOneAndUpdate(
                                { _id: deleteSwap.proposer },
                                { $pull: { activeSwaps: deleteSwap._id } }
                            );
                        };
                    };
                };
            };

            throw new AuthenticationError('You need to be logged in!');
        },
        createGroup: async (parent, args, context) => {
            if (context.user) {
                const group = await Group.create({ ...args, owners: context.user._id });
                    await User.findByIdAndUpdate(
                        { _id: context.user._id },
                        { $push: { groups: group._id } },
                        { new: true }
                    );

                return group;
            };

            throw new AuthenticationError('You need to be logged in!');
        },
        // use this mutation to replace data on a group property
        updateGroup: async (parent, args, context) => {
            if (context.user) {
                let updateArgs = args;
                delete updateArgs._id;

                const updateGroup = await Group.findOneAndUpdate(
                    { _id: args._id },
                    { updateArgs },
                    { new: true }
                );

                return updateGroup;
            };

            throw new AuthenticationError('You need to be logged in!');
        },
        // use this mutation to add to an array on a group property
        addToGroup: async (parent, args, context) => {
            if (context.user) {
                const groupToUpdate = await Group.findOne({ _id: args._id });

                if (args.listings) {
                    const newListings = [...groupToUpdate.listings, args.listings ];

                    const updatedGroup = await Group.findOneAndUpdate(
                        { _id: args._id },
                        { $addToSet: { listings: newListings } },
                        { new: true }
                    );

                    return updatedGroup;

                } else if (args.users) {
                    const newUsers = [...groupToUpdate.users, args.users ];

                    const updatedGroup = await Group.findOneAndUpdate(
                        { _id: args._id },
                        { $addToSet: { users: newUsers } },
                        { new: true }
                    );

                    return updatedGroup;

                } else if (args.owners) {
                    const newOwners = [...groupToUpdate.owners, args.owners ];

                    const updatedGroup = await Group.findOneAndUpdate(
                        { _id: args._id },
                        { $addToSet: { owners: newOwners } },
                        { new: true }
                    );
                    
                    return updatedGroup;

                } else if (args.admins) {
                    const newAdmins = [...groupToUpdate.admins, args.admins ];

                    const updatedGroup = await Group.findOneAndUpdate(
                        { _id: args._id },
                        { $addToSet: { admins: newAdmins } },
                        { new: true }
                    );

                    return updatedGroup;

                } else if (args.activeSwaps) {
                    const newSwaps = [...groupToUpdate.activeSwaps, args.activeSwaps ];

                    const updatedGroup = await Group.findOneAndUpdate(
                        { _id: args._id },
                        { $addToSet: { activeSwaps: newSwaps } },
                        { new: true }
                    );

                    return updatedGroup;

                } else if (args.messages) {
                    const newMessages = [...groupToUpdate.messages, args.messages ];

                    const updatedGroup = await Group.findOneAndUpdate(
                        { _id: args._id },
                        { $addToSet: { messages: newMessages } },
                        { new: true }
                    );

                    return updatedGroup;
                };
            };

            throw new AuthenticationError('You need to be logged in!');
        },
        deleteGroup: async (parent, {_id}, context) => {
                if (context.user) {
                    const deleteGroup = await Group.findOneAndDelete(
                        { _id: _id },
                        { new: true }
                    );

                    // delete group's listings
                    if (deleteGroup.listings.length > 0) {
                        for (i = 0; i < deleteGroup.listings.length; i++) {
                            // delete the listing
                            const deleteListing = await Listing.findOneAndDelete(
                                { _id: deleteGroup.listings[i]._id }
                            );

                            // delete the listing ID from the user's array
                            await User.findOneAndUpdate(
                                { _id: deleteListing.creator },
                                { $pull: { listings: deleteListing._id } }
                            );
                        };
                    };

                    // delete group's swaps
                    if (deleteGroup.activeSwaps.length > 0) {
                        for (i = 0; i < deleteGroup.activeSwaps.length; i++) {
                            // delete the swap
                            const deleteSwap = await Swap.findOneAndDelete(
                                { _id: deleteGroup.activeSwaps[i]._id }
                            );

                            // delete the swap from both users' arrays
                            await User.findOneAndUpdate(
                                { _id: deleteSwap.proposer },
                                { $pull: { activeSwaps: deleteSwap._id } }
                            );

                            await User.findOneAndUpdate(
                                { _id: deleteSwap.responder },
                                { $pull: { activeSwaps: deleteSwap._id } }
                            );
                        };
                    };

                    // delete group's messages
                    if (deleteGroup.messages.length > 0) {
                        for (i = 0; i < deleteGroup.messages.length; i++) {
                            // delete the message
                            const deleteMessage = await Message.findOneAndDelete(
                                { _id: deleteGroup.messages[i]._id }
                            );

                            // delete the message ID from both users' arrays
                            await User.findOneAndUpdate(
                                { _id: deleteMessage.sender },
                                { $pull: { messages: deleteMessage._id } }
                            );

                            await User.findOneAndUpdate(
                                { _id: deleteMessage.receiver },
                                { $pull: { messages: deleteMessage._id } }
                            );
                        };
                    };

                    return deleteGroup;
                };

                throw new AuthenticationError('You need to be logged in!');
        },
        createListing: async (parent, args) => {
                const {
                    title, group, creator, description, value
                } = args;

            // if (context.user) {
                const listing = await Listing.create({ title, group, creator, description, value });
                //const listing = await Listing.create({ ...args, creator: "6365afef10f1dc4557021a8e" }); // for testing

                await User.findByIdAndUpdate(
                    { _id: args.creator },
                    //{ _id: "6365afef10f1dc4557021a8e"}, // for testing
                    { $push: { listings: listing._id } },
                    { new: true }
                );

                await Group.findOneAndUpdate(
                    { _id: args.group },
                    { $push: { listings: listing._id } },
                    { new: true }
                );

                return listing;
            // };

            // throw new AuthenticationError('Must be logged in to do that');
        },
        deleteListing: async (parent, {_id}, context) => {
            if (context.user) {
                const deleteListing = await Listing.findOneAndDelete(
                  { _id: {_id} },
                  {new: true}
                );
                return deleteListing;
            };
            
            throw new AuthenticationError('You need to be logged in!')
        },
        createSwap: async (parent, args, context) => {
            if (context.user) {
                args = {...args, proposer: context.user._id };
                // args = {...args, proposer: "636193b03c809a462e4c4ad6"}; // for testing

                const newSwap = await Swap.create(args);

                // add swap to both users' arrays
                await User.findOneAndUpdate(
                    { _id: args.proposer },
                    // { _id: "636193b03c809a462e4c4ad6" }, // for testing
                    { $push: { activeSwaps: newSwap._id } }
                );

                await User.findOneAndUpdate(
                    { _id: args.responder },
                    { $push: { activeSwaps: newSwap._id } }
                );

                // add swap to group array
                await Group.findOneAndUpdate(
                    { _id: args.groupId },
                    { $push: { activeSwaps: newSwap._id } }
                );
            
                return newSwap;
            };

            throw new AuthenticationError('You need to be logged in!');
        },
        updateSwap: async (parent, args, context) => {
            if (context.user) {
                let propsToUpdate = {};

                if(args.response) {
                    propsToUpdate = {
                        response: args.response
                    };
                } else if (args.isActive) {
                    propsToUpdate = {
                        isActive: args.isActive
                    };
                } else if (args.isCompleted) {
                    propsToUpdate = {
                        isCompleted: args.isCompleted
                    };
                };  

                const updateSwap = await Swap.findOneAndUpdate(
                    { _id: args._id },
                    { propsToUpdate },
                    { new: true }
                );

                return updateSwap;
            };

            throw new AuthenticationError('You need to be logged in!');
        },
        deleteSwap: async (parent, { _id }, context) => {
            if (context.user) {
                const deleteSwap = await Swap.findOneAndDelete(
                    { _id: _id }
                );

                // delete from group
                await Group.findOneAndUpdate(
                    { _id: deleteSwap.group },
                    { $pull: { activeSwaps: _id } }
                )

                // delete from associated users
                await User.findOneAndUpdate(
                    { _id: deleteSwap.proposer },
                    { $pull: { activeSwaps: _id } }
                );

                await User.findOneAndUpdate(
                    { _id: deleteSwap.responder },
                    { $pull: { activeSwaps: _id } }
                );

                return deleteSwap;
            };

            throw new AuthenticationError('You need to be logged in !');
        },
        createMessage: async (parent, args, context) => {
            let newMessageData = { receiver: args.receiver, messageText: args.messageText };

            if (args.relevantListing) {
                newMessageData = {...newMessageData, relevantListing: args.relevantListing };
            };

            if (context.user) {
                newMessageData = {...newMessageData, sender: context.user._id };
                // newMessageData = {...newMessageData, sender: "6365afef10f1dc4557021a8e" }; // for testing

                const message = await Message.create(newMessageData);
               
                // add message to receiver's array
                await User.findByIdAndUpdate(
                    { _id: args.receiver },
                    { $push: { messages: message._id } },
                    { new: true }
                );

                // add message to sender's array
                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    // { _id: "6365afef10f1dc4557021a8e" }, // for testing
                    { $push: { messages: message._id } },
                    { new: true }
                );

                return message;
            };

            throw new AuthenticationError('You need to be logged in!');
        },
        deleteMessage: async (parent, {_id}, context) => {
            if (context.user) {
                const deleteMessage = await Message.findOneAndDelete(
                  { _id: _id }
                );

                // remove deleted message from sender's array
                await User.findOneAndUpdate(
                    { _id: deleteMessage.sender },
                    { $pull: { messages: deleteMessage._id } },
                    { new: true }
                );

                // remove deleted message from receiver's array
                await User.findOneAndUpdate(
                    { _id: deleteMessage.receiver },
                    { $pull: { messages: deleteMessage._id } },
                    { new: true }
                );

                return deleteMessage;
            };
            
            throw new AuthenticationError('You need to be logged in!')

        },
        createComment: async (parent, args, context) => {
            if (context.user) {
                const comment = await Comment.create({...args, commenter: context.user._id});
                // const comment = await Comment.create({...args, commenter: "636193b03c809a462e4c4ad6" }); // for testing
               
                const updatedMessage = await Message.findOneAndUpdate(
                    { _id: args.messageId },
                    { $push: {comments: comment._id} },
                    { new: true }

                ).populate('comments');
               
                return updatedMessage;
            };
            
            throw new AuthenticationError('You need to be logged in!');
        },
        deleteComment: async (parent, { commentId, messageId }, context) => {
            if (context.user) {
                const updatedMessage = await Message.findOneAndUpdate(
                    { _id: messageId },
                    { $pull: { comments: commentId } },
                    { new: true }
                );
            
                await Comment.findOneAndDelete(
                    { _id: commentId }
                );

                return updatedMessage
            };

            throw new AuthenticationError('You need to be logged in!');
        }
    }
};

module.exports = resolvers;