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

export const CREATE_LISTING = gql`
    mutation CreateListing($title: String!, $groupName: String!, $description: String, $value: Int) {
        createListing(title: $title, groupName: $groupName, description: $description, value: $value) {
        title
        description
        value
        creator
        }
    }
`;