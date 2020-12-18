import gql from "graphql-tag";

export const USER_FRAGMENT = gql`
  fragment userFragment on User {
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

/**
 * Queries
 *
 * @type {DocumentNode}
 */
export const USERS = gql`
  query {
    users {
      id
      name
      username
      email
      slug
      discord_private_channel_id
      discord_user_id
      profile {
        id
        operating_unit {
          id
          acronym
        }
        avatar
      }
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query me {
    me {
      ...userFragment
    }
  }
  ${USER_FRAGMENT}
`;

export const USER_FIND_BY_SLUG = gql`
  query ($slug: String!) {
    userFindBySlug(
      slug: $slug
    ) {
      ...userFragment
    }
  }
  ${USER_FRAGMENT}
`

export const UPDATE_PROFILE = gql`
  mutation (
    $id: ID!
    $profile: UpdateProfileHasOne
  ) {
    updateProfile(
      input: {
        id: $id
        profile: $profile
      }
    ) {
      id
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
    }
  }
`
