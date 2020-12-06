import gql from 'graphql-tag';

export const USER_FRAGMENT = gql`
  fragment user on User {
    id
    name
    email
    verified
    profile {
        nickname
        position
        operating_unit_id
        operating_unit {
            id
            image
            name
            operating_unit_type {
                id
                name
            }
        }
        contact_number
    }
    permissions
  }
`;
