const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        firstName: String!
        lastName: String!
        email: String!
        location: String
        groups: [Group]
        listings: [Listing]
        activeSwaps: [Swap]
        completedSwaps: Int
        messages: [Message]
    }

    type Group {
        _id: ID
        groupName: String!
        description: String
        location: String
        isPublic: Boolean
        listings: [Listing]
        users: [User]
        owners: [User]
        admins: [User]
        activeSwaps: [Swap]
        messages: [Message]
    }

    type Listing {
        _id: ID
        title: String!
        description: String
        value: Int
        creator: User!
        images: [String]
    }

    type Swap {
        _id: ID
        proposer: String!
        proposerListings: [Listing]
        proposerCash: Int
        responder: String!
        responderListings: [Listing]
        responderCash: Int
        swapMessage: Message
        isActive: Boolean
        isCompleted: Boolean
        response: String
    }

    type Message {
        _id: ID
        sender: String!
        receiver: String!
        messageText: String!
        comments: [Comment]
        relevantListing: Listing
    }

    type Comment {
        _id: ID
        commenter: String!
        commentText: String!
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        user(_id: ID!): User
        group(_id: ID!): Group
        groups: [Group]
        groupsPublic: [Group]
        listing(_id: ID!): Listing
        swap(_id: ID!, groupName: String!): Swap
        message(_id: ID!, groupName: String): Message
    }

    type Mutation {
        createUser(firstName: String!, lastName: String!, email: String!, password: String!, groups: [String]): Auth
        logIn(email: String!, password: String!): Auth
        updateUser(_id: ID!): User
        deleteUser(_id: ID!): User
        createGroup(groupName: String!, description: String, location: String, isPublic: Boolean): Group
        updateGroup(_id: ID!, groupName: String, description: String, location: String, isPublic: Boolean, listings: [String], users: [String], owners: [String], admins: [String], activeSwaps: [String], messages: [String]): Group
        addToGroup(_id: ID!, listings: [String], users: [String], owners: [String], admins: [String], activeSwaps: [String], messages: [String]): Group
        deleteGroup(_id: ID!): Group
        createListing(title: String!, description: String, value: Int, images: [String], groupId: ID!): Listing
        deleteListing(_id: ID!): Listing
        createSwap(proposerListings: [String], proposerCash: Int, responder: String!, responderListings: [String], responderCash: Int): Swap
        updateSwap(_id: ID!): Swap
        deleteSwap(_id: ID!): Swap
        createMessage(receiver: String!, messageText: String!, relevantListing: String): Message
        deleteMessage(_id: ID!): Message
        createComment(messageId: ID!, commentText: String!): Message
        deleteComment(commentId: ID!, messageId: ID!): Message
    }
`;

module.exports = typeDefs;