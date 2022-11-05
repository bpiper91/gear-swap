import { gql } from "@apollo/client";

export const QUERY_GROUPS = gql`
  query groups($id: ID!) {
    _id
    groupName
    description
    location
    isPublic
    listings {
      _id
      title
    }
    users {
      _id
      firstName
      lastName
    }
    owners {
      _id
      firstName
      lastName
    }
    admins {
      _id
      firstName
      lastName
    }
    activeSwaps {
      _id
      proposer
      swapMessage
    }
    messages {
      _id
      sender
      receiver
      messageText
    }
  }
`;
