import { gql } from '@apollo/client';

export const ITEM_CREATED_SUBSCRIPTION = gql`
  subscription ItemCreated {
    itemCreated {
      id
      name
      amount
      category
      date
      description
    }
  }
`;

export const ITEM_UPDATED_SUBSCRIPTION = gql`
  subscription ItemUpdated {
    itemUpdated {
      id
      name
      amount
      category
      date
      description
    }
  }
`;

// TODO 6.4 Graphql of subscription

// TODO 6.4 End
