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