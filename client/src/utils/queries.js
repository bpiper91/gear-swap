import { gql } from '@apollo/client';

export const QUERY_ME = gql`
    query Me {
        me {
            _id
            firstName
            lastName
            email
            location
            groups {
                _id
                groupName
            }
            listings {
                _id
                title
                images
            }
            activeSwaps {
                _id
            }
            completedSwaps
            messages {
                _id
                messageText
                sender
                receiver
            }
        }
    }
`;

export const QUERY_USER = gql`
    query User($id: ID!) {
        user(_id: $id) {
            _id
            firstName
            lastName
            email
            location
            groups {
                _id
                groupName
            }
            listings {
                _id
                title
                description
                value
                images
            }
            completedSwaps
        }
    }
`;

export const QUERY_GROUPS_PUBLIC = gql`
    query GroupsPublic {
        groupsPublic {
            _id
            groupName
            description
            location
            isPublic
            users {
                _id
            }
            owners {
                _id
            }
            admins {
                _id
            }
            listings {
                _id
            }
            messages {
                _id
            }
        }
    }
`;