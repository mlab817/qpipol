import gql from 'graphql-tag'

export const REVERT_TO_DRAFT_PROJECT = gql`
  mutation ($id: ID!) {
    revertToDraftProject(id: $id) {
      id
      title
      type {
        id
        name
      }
      operating_unit {
        id
        acronym
        image_url
      }
      updated_at
	    created_by
      creator {
        id
        nickname
      }
      investment_target_total
      main_funding_source {
        id
        name
      }
      submission_status {
        id
        name
      }
      version
			signed_copy_link
    }
  }
`
