import gql from 'graphql-tag';

export const BASIC_INFORMATION_FRAGMENT = gql`
  fragment basicInformation on Project {
    id
    title
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
    currency {
      id
      name
    }
    total_project_cost
    creator {
      id
      name
    }
    created_at
    updated_at
    processing_status {
      id
      name
    }
    submission_status {
      id
      name
    }
    processing_status_id
    finalized
  }
`;

export const NOTIFICATION_FRAGMENT = gql`
  fragment notificationDetails on Notification {
    id
    type
    notifiable_id
    notifiable_type
    notifiable {
      name
    }
    data {
      type
      from
      title
      body
      actionText
      actionUrl
    }
    read_at
    created_at
    updated_at
  }
`;
