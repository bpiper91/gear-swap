const { AuthenticationError } = require('apollo-server-express');
const { User, Group, Listing, Swap, Message, Comment } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
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
        group: async (parent, { groupName }) => {
            return Group.findOne({ groupName })
                .populate('listings');
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
            if (context.user) {
                const group = await Group.create({ ...args, owners: [context.user._id] });
                return group;
            };

            throw new AuthenticationError('Must be logged in to do that');
        },
        updateGroup: async () => {

        },
        deleteGroup: async () => {

        },
        createListing: async (parent, args, context) => {
            if (context.user) {
                const listing = await Listing.create({ ...args, creator: context.user._id });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { listings: listing._id } },
                    { new: true }
                );

                await Group.findOneAndUpdate(
                    { groupName: args.groupName },
                    { $push: { listings: listing._id } },
                    { new: true }
                );

                return listing;
            };

            throw new AuthenticationError('Must be logged in to do that');
        },
        deleteListing: async () => {

        },
        createSwap: async () => {

        },
        updateSwap: async () => {

        },
        deleteSwap: async () => {

        },
        createMessage: async () => {

        },
        deleteMessage: async () => {

        },
        createComment: async () => {

        },
        deleteComment: async () => {

        }
    }
};

module.exports = resolvers;