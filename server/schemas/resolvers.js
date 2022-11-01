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

            if (context.user._id === dbSwap.proposer._id || context.user._id === dbSwap.responder._id) {
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
            
            if (context.user._id === dbMessage.sender._id || context.user._id === dbMessage.receiver._id) {
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
        createUser: async () => {

        },
        logIn: async () => {

        },
        updateUser: async () => {

        },
        deleteUser: async () => {

        },
        createGroup: async () => {

        },
        updateGroup: async () => {

        },
        deleteGroup: async () => {

        },
        createListing: async () => {

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