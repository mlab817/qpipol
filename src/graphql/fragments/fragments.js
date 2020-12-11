import gql from 'graphql-tag';

export const BASIC_INFORMATION_FRAGMENT = gql`
  fragment basicInformation on Project {
    id
    title
    slug
    type {
      id
      name
    }
    operating_unit {
      id
      name
      image
      acronym
    }
    description
    spatial_coverage {
      id
      name
    }
    target_start_year
    target_end_year
    investment_target_total
    creator {
      id
      name
    }
    created_at
    updated_at
    submission_status {
      id
      name
    }
    pipol_status_id
    permissions {
      view
      update
      delete
      restore
    }
  }
`;
