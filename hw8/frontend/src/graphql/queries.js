import { gql } from '@apollo/client';

export const CHATBOX_QUERY = gql`
    query chatbox($name: String!) {
        chatbox(name: $name) {
            messages {
                sender
                body
            }
        }
    }
`;

