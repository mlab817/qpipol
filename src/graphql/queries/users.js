import gql from "graphql-tag";
import {USER_FRAGMENT} from "src/graphql/fragments";

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
`

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
