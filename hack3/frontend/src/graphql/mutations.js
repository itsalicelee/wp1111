import { gql } from '@apollo/client';

// TODO 3.1 Mutation - Update item

// TODO 3.1 End

export const UPDATE_ITEM_MUTATION = gql`
  mutation UpdateItem($input: UpdateItemInput!) {
    updateItem(input: $input) {
      id
    }
  }
`;

export const DELETE_ITEM_MUTATION = gql`
  mutation DeleteItem($id: ID!) {
    deleteItem(id: $id)
  }
`;
