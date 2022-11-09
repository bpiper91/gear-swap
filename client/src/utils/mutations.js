import { gql } from '@apollo/client';

export const CREATE_USER = gql`
    mutation createUser($firstName: String!, $lastName: String!, $email: String!, $password: String!, $location: String) {
        createUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password, location: $location) {
            token
            user {
                _id
                firstName
                lastName
            }
        }
    }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $id: ID!
    $firstName: String
    $lastName: String
    $email: String
    $password: String
    $location: String
    $completedSwaps: Int
  ) {
    updateUser(
      _id: $id
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      location: $location
      completedSwaps: $completedSwaps
    ) {
      _id
      firstName
      lastName
      email
      location
    }
  }
`;

export const UPDATE_USER_GROUPS = gql`
  mutation UpdateUserGroups($id: ID, $groups: String, $removeGroups: String) {
    updateUserGroups(_id: $id, groups: $groups, removeGroups: $removeGroups) {
      _id
      firstName
      lastName
      groups {
        _id
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($_id: String!) {
    deleteUser(_id: _id) {
      _id
      firstName
      lastName
      email
    }
  }
`;

export const CREATE_GROUP = gql`
  mutation CreateGroup(
    $groupName: String!
    $description: String
    $location: String
  ) {
    createGroup(
      groupName: $groupName
      description: $description
      location: $location
    ) {
      groupName
      description
      location
      isPublic
      listings {
        _id
        title
        description
        value
      }
      owners {
        _id
      }
      admins {
        _id
      }
    }
  }
`;

export const UPDATE_GROUP = gql`
  mutation UpdateGroup($id: ID!, $users: [String]) {
    updateGroup(_id: $id, users: $users) {
      _id
      groupName
      description
      location
      isPublic
      listings {
        _id
      }
      users {
        _id
      }
      owners {
        _id
      }
      admins {
        _id
      }
      activeSwaps {
        _id
      }
      messages {
        _id
      }
    }
  }
`;

export const ADD_TO_GROUP = gql`
  mutation AddToGroup($id: ID!, $users: [String]) {
    addToGroup(_id: $id, users: $users) {
      _id
      groupName
      description
      location
      isPublic
      listings {
        _id
      }
      users {
        _id
      }
      owners {
        _id
      }
      admins {
        _id
      }
      activeSwaps {
        _id
      }
      messages {
        _id
      }
    }
  }
`;

export const DELETE_GROUP = gql`
  mutation DeleteGroup($_id: String!) {
    deleteGroup(_id: _id) {
      _id
      groupName
      description
      location
    }
  }
`;

export const CREATE_LISTING = gql`
  mutation CreateListing(
    $title: String!
    $groupId: String!
    $description: String
    $value: Int
  ) {
    createListing(
      title: $title
      groupId: $groupId
      description: $description
      value: $value
    ) {
      title
      description
      value
      creator
      group
      images
    }
  }
`;

export const DELETE_LISTING = gql`
  mutation DeleteListing($id: ID!) {
    deleteListing(_id: $id) {
      _id
      title
      creator {
        _id
      }
    }
  }
`;

export const CREATE_SWAP = gql`
  mutation CreateSwap(
    $responder: String!
    $groupId: ID!
    $proposerListings: [String]
    $proposerCash: Int
    $responderListings: [String]
    $responderCash: Int
  ) {
    createSwap(
      responder: $responder
      groupId: $groupId
      proposerListings: $proposerListings
      proposerCash: $proposerCash
      responderListings: $responderListings
      responderCash: $responderCash
    ) {
      _id
      proposer
      proposerListings {
        _id
      }
      proposerCash
      responder
      responderListings {
        _id
      }
      responderCash
      swapMessage {
        _id
      }
      isActive
      group {
        _id
      }
    }
  }
`;

export const UPDATE_SWAP = gql`
  mutation UpdateSwap(
    $id: ID!
    $isActive: Boolean
    $isCompleted: Boolean
    $response: String
  ) {
    updateSwap(
      _id: $id
      isActive: $isActive
      isCompleted: $isCompleted
      response: $response
    ) {
      _id
      proposer
      responder
      isActive
      isCompleted
      response
      group {
        _id
      }
    }
  }
`;

export const DELETE_SWAP = gql`
  mutation DeleteSwap($id: ID!) {
    deleteSwap(_id: $id) {
      _id
      proposer
      responder
      swapMessage {
        _id
      }
      isActive
      isCompleted
      response
      group {
        _id
      }
    }
  }
`;

export const CREATE_MESSAGE = gql`
  mutation CreateMessage($receiver: String!, $messageText: String!) {
    createMessage(receiver: $receiver, messageText: $messageText) {
      _id
      sender
      receiver
      messageText
      comments {
        _id
      }
      relevantListing {
        _id
      }
    }
  }
`;

export const DELETE_MESSAGE = gql`
  mutation DeleteMessage($id: ID!) {
    deleteMessage(_id: $id) {
      _id
      messageText
      sender
      receiver
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation CreateComment($messageId: ID!, $commentText: String!) {
    createComment(messageId: $messageId, commentText: $commentText) {
      _id
      sender
      receiver
      messageText
      comments {
        _id
        commentText
      }
      relevantListing {
        _id
      }
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation DeleteComment($commentId: ID!, $messageId: ID!) {
    deleteComment(commentId: $commentId, messageId: $messageId) {
      _id
      sender
      receiver
      comments {
        _id
      }
      relevantListing {
        _id
      }
    }
  }
`;