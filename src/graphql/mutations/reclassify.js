import gql from 'graphql-tag';

export const RECLASSIFY_PROJECT = gql`
  mutation (
    $id: ID!
    $prexc_program_id: ID
    $prexc_subprogram_id: ID
    $banner_program_id: ID
  ) {
    reclassifyProject(
      id: $id
      prexc_program_id: $prexc_program_id
      prexc_subprogram_id: $prexc_subprogram_id
      banner_program_id: $banner_program_id
    ) {
      id
      title
      type {
        id
        name
      }
	    banner_program_id
	    banner_program {
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

export const RECLASSIFY_PREXC_ACTIVITY = gql`
  mutation (
    $id: ID!
    $prexc_program_id: ID
    $prexc_subprogram_id: ID
    $banner_program_id: ID
  ) {
    reclassifyProject(
      id: $id
      prexc_program_id: $prexc_program_id
      prexc_subprogram_id: $prexc_subprogram_id
      banner_program_id: $banner_program_id
    ) {
      id
      name
      banner_program_id
      banner_program {
        id
        name
      }
      operating_unit_id
      operating_unit {
        id
        name
      }
      prexc_program {
        id
        name
      }
      prexc_subprogram {
        id
        name
      }
      project_id
      uacs_code
      infrastructure_target_total
      investment_target_total
      gaa_total
      nep_total
      disbursement_total
      finalized
      reviewed
    }
  }
`
