const { AuthenticationError } = require('apollo-server-express');
const { User, Group, Listing, Swap, Message, Comment } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('groups')
                    .populate('listings')
                    .populate('activeSwaps')
                    .populate('messages');
                return userData;
               
            }

            throw new AuthenticationError('Must be logged in to do that');
        },
        user: async (parent, { _id }) => {
            return User.findOne({ _id })
                .select('-__v -password')
                .populate('listings');
        },
        group: async (parent, {_id }) => {
            return Group.findOne({_id })
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
            return Group.find()
                .populate('admins');
        },
        listing: async (parent, { _id }) => {
            return Listing.findOne({ _id });
            
        },
        swap: async (parent, { _id, groupName }, context) => {
            const dbSwap = await Swap.findOne({ _id })
                .populate('proposerListings')
                .populate('responderListings');

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
        logIn: async (parent, { email, password }) => {
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
        updateUser: async () => {

        },
        deleteUser: async () => {

        },
        createGroup: async (parent, args, context) => {
            // if (context.user) {
                const group = await Group.create({ ...args, owners: context.user._id });
                    await User.findByIdAndUpdate(
                        { _id: context.user._id },
                        { $push: { groups: group._id } },
                        { new: true }
                    );

                return group;
            // };

            // throw new AuthenticationError('You need to be logged in!');
        },
        // use this mutation to replace data on a group property
        updateGroup: async (parent, args, context) => {
            // if (context.user) {
                const updatedGroup = await Group.findOneAndUpdate(
                    {_id: args._id},
                    {...args},
                    {new: true}
                );

                return updatedGroup;
            // };

            // throw new AuthenticationError('Action not allowed')
        },
        // use this mutation to add to an array on a group property
        addToGroup: async (parent, args, context) => {
            // if (context.user) {
                const groupToUpdate = await Group.findOne({ _id: args._id });

                if (args.listings) {
                    const newListings = [...groupToUpdate.listings, args.listings ];

                    const updatedGroup = await Group.findOneAndUpdate(
                        { _id: args._id },
                        { $push: { listings: newListings } },
                        { new: true }
                    );

                    return updatedGroup;

                } else if (args.users) {
                    const newUsers = [...groupToUpdate.users, args.users ];

                    const updatedGroup = await Group.findOneAndUpdate(
                        { _id: args._id },
                        { $push: { users: newUsers } },
                        { new: true }
                    );

                    return updatedGroup;

                } else if (args.owners) {
                    const newOwners = [...groupToUpdate.owners, args.owners ];

                    const updatedGroup = await Group.findOneAndUpdate(
                        { _id: args._id },
                        { $push: { owners: newOwners } },
                        { new: true }
                    );
                    
                    return updatedGroup;

                } else if (args.admins) {
                    const newAdmins = [...groupToUpdate.admins, args.admins ];

                    const updatedGroup = await Group.findOneAndUpdate(
                        { _id: args._id },
                        { $push: { admins: newAdmins } },
                        { new: true }
                    );

                    return updatedGroup;

                } else if (args.activeSwaps) {
                    const newSwaps = [...groupToUpdate.activeSwaps, args.activeSwaps ];

                    const updatedGroup = await Group.findOneAndUpdate(
                        { _id: args._id },
                        { $push: { activeSwaps: newSwaps } },
                        { new: true }
                    );

                    return updatedGroup;

                } else if (args.messages) {
                    const newMessages = [...groupToUpdate.messages, args.messages ];

                    const updatedGroup = await Group.findOneAndUpdate(
                        { _id: args._id },
                        { $push: { messages: newMessages } },
                        { new: true }
                    );

                    return updatedGroup;
                };
            // };

            // throw new AuthenticationError('You need to be logged in!');
        },
        deleteGroup: async (parent, {_id}, context) => {

                // if (context.user) {
                  const deleteGroup = await Group.findOneAndDelete(
                    { _id: {_id} },
                    {new: true}
                  );
                  return deleteGroup;
                // };

                // throw new AuthenticationError('You need to be logged in!');
        },
        createListing: async (parent, args, context) => {
            // if (context.user) {
                // const listing = await Listing.create({ ...args, creator: context.user._id });
                const listing = await Listing.create({ ...args, creator: "636198d2be7f9674d305b7e9" });

                await User.findByIdAndUpdate(
                    // { _id: context.user._id },
                    { _id: "636198d2be7f9674d305b7e9"},
                    { $push: { listings: listing._id } },
                    { new: true }
                );

                await Group.findOneAndUpdate(
                    { _id: args.groupId },
                    { $push: { listings: listing._id } },
                    { new: true }
                );

                return listing;
            // };

            // throw new AuthenticationError('Must be logged in to do that');
        },
        deleteListing: async (parent, {_id}, context) => {
            // if (context.user) {
                const deleteListing = await Listing.findOneAndDelete(
                  { _id: {_id} },
                  {new: true}
                );
                return deleteListing;
            // };
            
            // throw new AuthenticationError('You need to be logged in!')
        },
        createSwap: async () => {

        },
        updateSwap: async () => {

        },
        deleteSwap: async () => {

        },
        createMessage: async (parent, args, context) => {
            const newMessageData = { receiver: args.receiver, messageText: args.messageText };

            if (args.relevantListing) {
                newMessageData = {...newMessageData, relevantListing: args.relevantListing };
            };

            // if (context.user) {
                // newMessageData = {...newMessageData, sender: context.user._id };
                newMessageData = {...newMessageData, sender: "6365afef10f1dc4557021a8e" };

                const message = await Message.create(newMessageData);
               
                await User.findByIdAndUpdate(
                    { _id: args.receiver },
                    { $push: { messages: message._id } },
                    { new: true }
                );

                await User.findByIdAndUpdate(
                    // { _id: context.user._id },
                    { _id: "6365afef10f1dc4557021a8e" },
                    { $push: { messages: message._id } },
                    { new: true }
                );

                return message;
            // };

            // throw new AuthenticationError('You need to be logged in!');
        },
        deleteMessage: async (parent, {_id}, context) => {
            if (context.user) {
                const deleteMessage = await Message.findOneAndDelete(
                  { _id: {_id} },
                  {new: true}
                );
                return deleteMessage;
              }
              throw new AuthenticationError('You need to be logged in!')

        },
        createComment: async (parent, args, context) => {
            // if (context.user) {
                // const comment = await Comment.create({...args, commenter: context.user._id});
                const comment = await Comment.create({...args, commenter: "636193b03c809a462e4c4ad6" });
               
                const updatedMessage = await Message.findOneAndUpdate(
                    { _id: args.messageId },
                    { $push: {comments: comment._id} },
                    { new: true }

                ).populate('comments');
               
                return updatedMessage;
            // }
            
            // throw new AuthenticationError('You need to be logged in!');
        },
        deleteComment: async () => {

        }
    }
};

module.exports = resolvers;