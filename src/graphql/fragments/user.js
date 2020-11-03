import gql from 'graphql-tag';

export const USER_FRAGMENT = gql`
  fragment user on User {
    id
    name
    nickname
    email
    position
    verified
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
    user_avatar
    contact_number
    role {
      id
      name
    }
    reviews {
      id
      acronym
    }
  }
`;
