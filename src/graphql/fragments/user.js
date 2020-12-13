import gql from 'graphql-tag';

export const USER_FRAGMENT = gql`
  fragment user on User {
    id
    name
    email
    username
    verified
    profile {
      id
      user_id
      first_name
      last_name
      nickname
      position
      contact_number
      avatar
      short_description
    }
    permissions {
      id
      name
    }
    discord_user_id
    discord_private_channel_id
    operating_unit_id
    operating_unit {
      id
      name
      acronym
    }
  }
`;
