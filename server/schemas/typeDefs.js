const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        firstName: String!
        lastName: String!
        email: String!
        location: String
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
        description: String!
        value: Int
        creator: String!
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
        group(groupName: String!): Group
        groups: [Group]
        groupsPublic: [Group]
        listing(_id: ID!): Listing
        swap(_id: ID!, groupName: String!): Swap
        message(_id: ID!, groupName: String!): Message
    }

    type Mutation {
        createUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
        logIn(email: String!, password: String!): Auth
        updateUser(_id: ID!): User
        deleteUser(_id: ID!): User
        createGroup(groupName: String!, description: String, location: String, isPublic: Boolean): Group
        updateGroup(groupName: String!): Group
        deleteGroup(groupName: String!): Group
        createListing(title: String!, description: String, value: Int, groupName: String!): Listing
        deleteListing(_id: ID!): Listing
        createSwap(proposerListings: [Listing], proposerCash: Int, responder: User!, responderListings: [Listing], responderCash: Int): Swap
        updateSwap(_id: ID!): Swap
        deleteSwap(_id: ID!): Swap
        createMessage(receiver: User!, messageText: String!, relevantListing: Listing): Message
        deleteMessage(_id: ID!): Message
        createComment(commentText: String!): Comment
        deleteComment(_id: ID!): Comment
    }
`;

module.exports = typeDefs;