import gql from "graphql-tag";

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
