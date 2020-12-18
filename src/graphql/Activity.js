import gql from 'graphql-tag';

export const ACTIVITY_FRAGMENT = gql`
  fragment activityFragment on PrexcActivity {
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
    prexc_program_id
    prexc_program {
      id
      name
    }
    prexc_subprogram_id
    prexc_subprogram {
      id
      name
    }
    project_id
    uacs_code
    infrastructure_target_2016
    infrastructure_target_2017
    infrastructure_target_2018
    infrastructure_target_2019
    infrastructure_target_2020
    infrastructure_target_2021
    infrastructure_target_2022
    infrastructure_target_2023
    infrastructure_target_2024
    infrastructure_target_2025
    infrastructure_target_total
    investment_target_2016
    investment_target_2017
    investment_target_2018
    investment_target_2019
    investment_target_2020
    investment_target_2021
    investment_target_2022
    investment_target_2023
    investment_target_2024
    investment_target_2025
    investment_target_total
    gaa_2016
    gaa_2017
    gaa_2018
    gaa_2019
    gaa_2020
    gaa_2021
    gaa_2022
    gaa_2023
    gaa_2024
    gaa_2025
    gaa_total
    nep_2016
    nep_2017
    nep_2018
    nep_2019
    nep_2020
    nep_2021
    nep_2022
    nep_2023
    nep_2024
    nep_2025
    nep_total
    disbursement_2016
    disbursement_2017
    disbursement_2018
    disbursement_2019
    disbursement_2020
    disbursement_2021
    disbursement_2022
    disbursement_2023
    disbursement_2024
    disbursement_2025
    disbursement_total
    finalized
    reviewed
    submission_status_id
    submission_status {
      id
      name
    }
  }
`;

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
      submission_status {
        id
        name
      }
    }
  }
`

/** Mutations **/

export const CREATE_ACTIVITY = gql`
  mutation(
    $name: String
    $operating_unit_id: ID
    $prexc_program_id: ID
    $prexc_subprogram_id: ID
    $banner_program_id: ID
    $investment_target_2016: Float
    $investment_target_2017: Float
    $investment_target_2018: Float
    $investment_target_2019: Float
    $investment_target_2020: Float
    $investment_target_2021: Float
    $investment_target_2022: Float
    $investment_target_2023: Float
    $investment_target_2024: Float
    $investment_target_2025: Float
    $investment_target_total: Float
    $infrastructure_target_2016: Float
    $infrastructure_target_2017: Float
    $infrastructure_target_2018: Float
    $infrastructure_target_2019: Float
    $infrastructure_target_2020: Float
    $infrastructure_target_2021: Float
    $infrastructure_target_2022: Float
    $infrastructure_target_2023: Float
    $infrastructure_target_2024: Float
    $infrastructure_target_2025: Float
    $infrastructure_target_total: Float
    $gaa_2016: Float
    $gaa_2017: Float
    $gaa_2018: Float
    $gaa_2019: Float
    $gaa_2020: Float
    $gaa_2021: Float
    $gaa_2022: Float
    $gaa_2023: Float
    $gaa_2024: Float
    $gaa_2025: Float
    $gaa_total: Float
    $nep_2016: Float
    $nep_2017: Float
    $nep_2018: Float
    $nep_2019: Float
    $nep_2020: Float
    $nep_2021: Float
    $nep_2022: Float
    $nep_2023: Float
    $nep_2024: Float
    $nep_2025: Float
    $nep_total: Float
    $disbursement_2016: Float
    $disbursement_2017: Float
    $disbursement_2018: Float
    $disbursement_2019: Float
    $disbursement_2020: Float
    $disbursement_2021: Float
    $disbursement_2022: Float
    $disbursement_2023: Float
    $disbursement_2024: Float
    $disbursement_2025: Float
    $disbursement_total: Float
  ) {
    createActivity(
      input: {
        name: $name
        operating_unit_id: $operating_unit_id
        prexc_program_id: $prexc_program_id
        prexc_subprogram_id: $prexc_subprogram_id
        banner_program_id: $banner_program_id
        investment_target_2016: $investment_target_2016
        investment_target_2017: $investment_target_2017
        investment_target_2018: $investment_target_2018
        investment_target_2019: $investment_target_2019
        investment_target_2020: $investment_target_2020
        investment_target_2021: $investment_target_2021
        investment_target_2022: $investment_target_2022
        investment_target_2023: $investment_target_2023
        investment_target_2024: $investment_target_2024
        investment_target_2025: $investment_target_2025
        investment_target_total: $investment_target_total
        infrastructure_target_2016: $infrastructure_target_2016
        infrastructure_target_2017: $infrastructure_target_2017
        infrastructure_target_2018: $infrastructure_target_2018
        infrastructure_target_2019: $infrastructure_target_2019
        infrastructure_target_2020: $infrastructure_target_2020
        infrastructure_target_2021: $infrastructure_target_2021
        infrastructure_target_2022: $infrastructure_target_2022
        infrastructure_target_2023: $infrastructure_target_2023
        infrastructure_target_2024: $infrastructure_target_2024
        infrastructure_target_2025: $infrastructure_target_2025
        infrastructure_target_total: $infrastructure_target_total
        gaa_2016: $gaa_2016
        gaa_2017: $gaa_2017
        gaa_2018: $gaa_2018
        gaa_2019: $gaa_2019
        gaa_2020: $gaa_2020
        gaa_2021: $gaa_2021
        gaa_2022: $gaa_2022
        gaa_2023: $gaa_2023
        gaa_2024: $gaa_2024
        gaa_2025: $gaa_2025
        gaa_total: $gaa_total
        nep_2016: $nep_2016
        nep_2017: $nep_2017
        nep_2018: $nep_2018
        nep_2019: $nep_2019
        nep_2020: $nep_2020
        nep_2021: $nep_2021
        nep_2022: $nep_2022
        nep_2023: $nep_2023
        nep_2024: $nep_2024
        nep_2025: $nep_2025
        nep_total: $nep_total
        disbursement_2016: $disbursement_2016
        disbursement_2017: $disbursement_2017
        disbursement_2018: $disbursement_2018
        disbursement_2019: $disbursement_2019
        disbursement_2020: $disbursement_2020
        disbursement_2021: $disbursement_2021
        disbursement_2022: $disbursement_2022
        disbursement_2023: $disbursement_2023
        disbursement_2024: $disbursement_2024
        disbursement_2025: $disbursement_2025
        disbursement_total: $disbursement_total
      }
    ) {
      ...activityFragment
    }
  }
  ${ACTIVITY_FRAGMENT}
`;

export const UPDATE_ACTIVITY = gql`
  mutation(
    $id: ID!
    $name: String
    $operating_unit_id: ID
    $prexc_program_id: ID
    $prexc_subprogram_id: ID
    $banner_program_id: ID
    $investment_target_2016: Float
    $investment_target_2017: Float
    $investment_target_2018: Float
    $investment_target_2019: Float
    $investment_target_2020: Float
    $investment_target_2021: Float
    $investment_target_2022: Float
    $investment_target_2023: Float
    $investment_target_2024: Float
    $investment_target_2025: Float
    $investment_target_total: Float
    $infrastructure_target_2016: Float
    $infrastructure_target_2017: Float
    $infrastructure_target_2018: Float
    $infrastructure_target_2019: Float
    $infrastructure_target_2020: Float
    $infrastructure_target_2021: Float
    $infrastructure_target_2022: Float
    $infrastructure_target_2023: Float
    $infrastructure_target_2024: Float
    $infrastructure_target_2025: Float
    $infrastructure_target_total: Float
    $gaa_2016: Float
    $gaa_2017: Float
    $gaa_2018: Float
    $gaa_2019: Float
    $gaa_2020: Float
    $gaa_2021: Float
    $gaa_2022: Float
    $gaa_2023: Float
    $gaa_2024: Float
    $gaa_2025: Float
    $gaa_total: Float
    $nep_2016: Float
    $nep_2017: Float
    $nep_2018: Float
    $nep_2019: Float
    $nep_2020: Float
    $nep_2021: Float
    $nep_2022: Float
    $nep_2023: Float
    $nep_2024: Float
    $nep_2025: Float
    $nep_total: Float
    $disbursement_2016: Float
    $disbursement_2017: Float
    $disbursement_2018: Float
    $disbursement_2019: Float
    $disbursement_2020: Float
    $disbursement_2021: Float
    $disbursement_2022: Float
    $disbursement_2023: Float
    $disbursement_2024: Float
    $disbursement_2025: Float
    $disbursement_total: Float
  ) {
    updatePrexcActivity(
      input: {
        id: $id
        name: $name
        operating_unit_id: $operating_unit_id
        prexc_program_id: $prexc_program_id
        prexc_subprogram_id: $prexc_subprogram_id
        banner_program_id: $banner_program_id
        investment_target_2016: $investment_target_2016
        investment_target_2017: $investment_target_2017
        investment_target_2018: $investment_target_2018
        investment_target_2019: $investment_target_2019
        investment_target_2020: $investment_target_2020
        investment_target_2021: $investment_target_2021
        investment_target_2022: $investment_target_2022
        investment_target_2023: $investment_target_2023
        investment_target_2024: $investment_target_2024
        investment_target_2025: $investment_target_2025
        investment_target_total: $investment_target_total
        infrastructure_target_2016: $infrastructure_target_2016
        infrastructure_target_2017: $infrastructure_target_2017
        infrastructure_target_2018: $infrastructure_target_2018
        infrastructure_target_2019: $infrastructure_target_2019
        infrastructure_target_2020: $infrastructure_target_2020
        infrastructure_target_2021: $infrastructure_target_2021
        infrastructure_target_2022: $infrastructure_target_2022
        infrastructure_target_2023: $infrastructure_target_2023
        infrastructure_target_2024: $infrastructure_target_2024
        infrastructure_target_2025: $infrastructure_target_2025
        infrastructure_target_total: $infrastructure_target_total
        gaa_2016: $gaa_2016
        gaa_2017: $gaa_2017
        gaa_2018: $gaa_2018
        gaa_2019: $gaa_2019
        gaa_2020: $gaa_2020
        gaa_2021: $gaa_2021
        gaa_2022: $gaa_2022
        gaa_2023: $gaa_2023
        gaa_2024: $gaa_2024
        gaa_2025: $gaa_2025
        gaa_total: $gaa_total
        nep_2016: $nep_2016
        nep_2017: $nep_2017
        nep_2018: $nep_2018
        nep_2019: $nep_2019
        nep_2020: $nep_2020
        nep_2021: $nep_2021
        nep_2022: $nep_2022
        nep_2023: $nep_2023
        nep_2024: $nep_2024
        nep_2025: $nep_2025
        nep_total: $nep_total
        disbursement_2016: $disbursement_2016
        disbursement_2017: $disbursement_2017
        disbursement_2018: $disbursement_2018
        disbursement_2019: $disbursement_2019
        disbursement_2020: $disbursement_2020
        disbursement_2021: $disbursement_2021
        disbursement_2022: $disbursement_2022
        disbursement_2023: $disbursement_2023
        disbursement_2024: $disbursement_2024
        disbursement_2025: $disbursement_2025
        disbursement_total: $disbursement_total
      }
    ) {
      ...activityFragment
    }
  }
  ${ACTIVITY_FRAGMENT}
`;

export const DELETE_ACTIVITY = gql`
  mutation($id: ID!) {
    deleteActivity(id: $id) {
      id
      name
    }
  }
`;

export const RECLASSIFY_PREXC_ACTIVITY = gql`
  mutation (
    $id: ID!
    $banner_program_id: ID
  ) {
    reclassifyPrexcActivity(
      id: $id
      banner_program_id: $banner_program_id
    ) {
      ...activityFragment
    }
  }
  ${ACTIVITY_FRAGMENT}
`

export const UNDO_FINALIZE_ACTIVITY = gql`
  mutation ($id: ID!) {
    undoFinalizeActivity(id: $id) {
      ...activityFragment
    }
  }
  ${ACTIVITY_FRAGMENT}
`
