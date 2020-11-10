import gql from 'graphql-tag'
import { PREXC_ACTIVITY_FRAGMENT } from  '../fragments'

export const CONSOLIDATED_ACTIVITIES = gql`
  query {
    consolidatedActivities {
      id
      operating_unit {
        id
        acronym
      }
      prexc_program {
        id
        name
      }
      prexc_subprogram {
        id
        name
      }
      name
      banner_program_id
      banner_program {
        id
        name
      }
      operating_unit_id
      uacs_code
      infrastructure_target_total
      investment_target_total
      nep_total
      gaa_total
      disbursement_total
      finalized
      reviewed
    }
  }
`
