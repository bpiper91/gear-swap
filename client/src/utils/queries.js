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
                description
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
                description
            }
            listings {
                _id
                title
                description
                value
                images
            }
            activeSwaps {
                _id
            }
            completedSwaps
        }
    }
`;

export const QUERY_USERS = gql`
    query Users {
        users {
            _id
            firstName
            lastName
            email
            location
            groups {
                _id
            }
            listings {
                _id
            }
            activeSwaps {
                _id
            }
            completedSwaps
            messages {
                _id
            }
        }
    }
`;

export const QUERY_GROUP = gql`
    query Group($_id: ID!) {
        group(_id: $_id) {
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

export const QUERY_GROUPS = gql`
    query Groups {
        groups {
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

export const QUERY_LISTING = gql`
    query Listing($_id: ID!) {
        listing(_id: $_id) {
            _id
            title
            description
            value
            creator {
                _id
                firstName
                lastName
                location
                completedSwaps
            }
            images
        }
    }
`;

export const QUERY_LISTINGS_DISPLAY = gql`
    query ListingsDisplay($groupId: ID!) {
        listingsDisplay(groupId: $groupId) {
            _id
            title
            description
            value
            creator {
                _id
                firstName
                lastName
                location
                completedSwaps
            }
            images
        }
    } 
`;

export const QUERY_SWAP = gql`
    query Swap($id: ID!, $groupName: String!) {
        swap(_id: $id, groupName: $groupName) {
            _id
            proposer
            proposerListings {
                _id
                title
                images
            }
            proposerCash
            responder
            responderListings {
                _id
                title
                images
            }
            responderCash
            swapMessage {
                _id
                sender
                receiver
                messageText
            }
            isActive
            isCompleted
            response
            group {
                _id
                groupName
            }
        }
    }
`;

export const QUERY_MESSAGE = gql`
    query Message($id: ID!, $groupName: String) {
        message(_id: $id, groupName: $groupName) {
            _id
            sender
            receiver
            messageText
            comments {
                _id
                commenter
                commentText
            }
            relevantListing {
                _id
                title
                creator {
                    _id
                }
                images
            }
        }
    }
`;