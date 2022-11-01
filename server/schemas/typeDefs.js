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
        creator: User!
    }

    type Swap {
        _id: ID
        proposer: User!
        proposerListings: [Listing]
        proposerCash: Int
        responder: User!
        responderListings: [Listing]
        responderCash: Int
        swapMessage: Message
        isActive: Boolean
        isCompleted: Boolean
    }

    type Message {
        _id: ID
        sender: User!
        receiver: User!
        messageText: String!
        comments: [Comment]
        relevantListing: Listing
    }

    type Comment {
        _id: ID
        commenter: User!
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
        groupListings(groupName: String!): [Listing]
        swap(_id: ID!): Swap
        message(_id: ID!): Message
    }

    type Mutation {
        createUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
        logIn(email: String!, password: String!): Auth
        updateUser(_id: ID!): User
        deleteUser(_id: ID!): User
        createGroup(groupName: String!): Group
        updateGroup(groupName: String!): Group
        deleteGroup(groupName: String!): Group
        createListing(title: String!, description: String!, value: Int): Listing
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