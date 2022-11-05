import { gql } from '@apollo/client';

export const CREATE_USER = gql`
    mutation CreateUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
        createUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
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
    mutation LogIn($email: String!, $password: String!) {
        logIn(email: $email, password: $password) {
            token
            user {
                _id
                firstName
                lastName
            }
        }
    }
`;

export const CREATE_GROUP = gql`
    mutation CreateGroup($groupName: String!, $description: String, $location: String) {
        createGroup(groupName: $groupName, description: $description, location: $location) {
            groupName
            description
            location
            isPublic
            listings {
                _id
                title
                description
                value
                creator
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

export const CREATE_LISTING = gql`
    mutation CreateListing($title: String!, $groupId: String!, $description: String, $value: Int) {
        createListing(title: $title, groupId: $groupId, description: $description, value: $value) {
        title
        description
        value
        creator
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