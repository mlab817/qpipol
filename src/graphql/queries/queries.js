import gql from 'graphql-tag';
import {
  USER_FRAGMENT,
  NOTIFICATION_FRAGMENT,
  PROJECT_FRAGMENT,
  PREXC_ACTIVITY_FRAGMENT
} from '../fragments';

/* Auth */
export const CHECK_EMAIL_AVAILABILITY_QUERY = gql`
  query checkEmailAvailability($email: String!) {
    checkEmailAvailability(email: $email) {
      message
      status
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query getCurrentUser {
    getCurrentUser {
      ...user
      project_count
    }
  }
  ${USER_FRAGMENT}
`;

export const GET_IMAGES = gql`
  query images {
    images {
      id
      name
      dropbox_link
      size
    }
  }
`;

/* Notifications */

export const FETCH_NOTIFICATIONS_QUERY = gql`
  query notifications {
    notifications {
      ...notificationDetails
    }
  }
  ${NOTIFICATION_FRAGMENT}
`;

export const FETCH_UNREAD_NOTIFICATIONS_QUERY = gql`
  query unreadNotifications {
    unreadNotifications {
      ...notificationDetails
    }
  }
  ${NOTIFICATION_FRAGMENT}
`;

/* Options */

export const FETCH_CURRENCIES = gql`
  query currencies {
    currencies {
      id
      name
    }
  }
`;

export const FETCH_DISTRICTS = gql`
  query districts {
    districts {
      id
      name
      province_id
    }
  }
`;

export const FETCH_FUNDING_SOURCES = gql`
  query funding_sources {
    funding_sources {
      id
      name
    }
  }
`;

export const FETCH_FUNDING_INSTITUTIONS = gql`
  query funding_institutions {
    funding_institutions {
      id
      name
    }
  }
`;

export const FETCH_OPERATING_UNITS = gql`
  query operating_units {
    operating_units {
      id
      operating_unit_type_id
      operating_unit_type {
        id
        name
      }
      name
      acronym
      agency_head_name
      agency_head_designation
      telephone_number
      fax_number
      email
      image
      image_url
      focals {
        id
        name
        email
        position
        active
        verified
        image_url
      }
      reviewers {
        id
        name
      }
    }
  }
`;

export const FETCH_OPERATING_UNIT = gql`
  query($id: ID!) {
    operating_unit(id: $id) {
      id
      operating_unit_type_id
      operating_unit_type {
        id
        name
      }
      name
      acronym
      agency_head_name
      agency_head_designation
      telephone_number
      fax_number
      email
      image
      image_url
      focals {
        id
        name
        email
        position
        active
        verified
        image_url
      }
      reviewers {
        id
        name
      }
    }
  }
`;

export const FETCH_PROJECT_STATUSES = gql`
  query project_statuses {
    project_statuses {
      id
      name
    }
  }
`;

export const FETCH_PROVINCES = gql`
  query provinces {
    provinces {
      id
      name
      region_id
    }
  }
`;

export const FETCH_REGIONS = gql`
  query regions {
    regions {
      id
      name
    }
  }
`;

export const FETCH_SPATIAL_COVERAGES = gql`
  query spatial_coverages {
    spatial_coverages {
      id
      name
    }
  }
`;

export const FETCH_TECHNICAL_READINESSES = gql`
  query technical_readinesses {
    technical_readinesses {
      id
      name
    }
  }
`;

export const FETCH_ROLES = gql`
  query roles {
    roles {
      id
      name
    }
  }
`;

export const FETCH_TIERS = gql`
  query {
    tiers {
      id
      name
    }
  }
`;

export const FETCH_TYPES = gql`
  query {
    types {
      id
      name
    }
  }
`;

export const FETCH_TYPOLOGIES = gql`
  query {
    typologies {
      id
      name
    }
  }
`;

export const FETCH_BASES = gql`
  query {
    bases {
      id
      name
    }
  }
`;

export const FETCH_IMPLEMENTATION_MODES = gql`
  query {
    implementation_modes {
      id
      name
    }
  }
`;

export const FETCH_YEARS = gql`
  query {
    years {
      id
      name
    }
  }
`;

export const FETCH_CITY_MUNICIPALITIES_QUERY = gql`
  query city_municipalities {
    city_municipalities {
      id
      name
    }
  }
`;

export const FETCH_REVIEWERS_QUERY = gql`
  query reviewers {
    reviewers {
      id
      name
      reviews {
        id
        projects {
          id
        }
      }
    }
  }
`;

export const FETCH_ENCODERS_QUERY = gql`
  query encoders {
    encoders {
      id
      name
      operating_unit {
        id
        acronym
      }
      image_url
    }
  }
`;

/* Projects */

export const ALL_PROJECTS = gql`
  query {
    allProjects {
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
`;

export const DELETED_PROJECTS_QUERY = gql`
  query allProjects {
    allProjects(trashed: ONLY) {
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
      deleted_at
      submission_status {
        id
        name
      }
      creator {
        id
        nickname
      }
      investment_target_total
      main_funding_source {
        id
        name
      }
    }
  }
`;

export const FETCH_PROJECT_QUERY = gql`
  query project($id: ID!) {
    project(id: $id) {
      ...projectFragment
    }
  }
  ${PROJECT_FRAGMENT}
`;

export const SEARCH_PROJECTS = gql`
  query searchProjects($search: String!) {
    searchProjects(search: $search) {
      id
      title
    }
  }
`;

/* Activities */

export const FETCH_ACTIVITIES = gql`
  query($first: Int!, $page: Int, $orderBy: [ActivitiesOrderByOrderByClause!]) {
    activities(first: $first, page: $page, orderBy: $orderBy) {
      data {
        id
        description
        properties
        subject {
          id
          name
          title
        }
        causer {
          id
          name
        }
        created_at
        updated_at
      }
      paginatorInfo {
        count
        currentPage
        firstItem
        hasMorePages
        lastItem
        lastPage
        perPage
        total
      }
    }
  }
`;

/* Fetch GAD Questions */

export const FETCH_GAD_QUESTIONS = gql`
  query {
    gad_questions {
      id
      name
      gad_subquestions {
        id
        name
        gad_choices {
          id
          name
          value
        }
      }
    }
  }
`;

export const PROJECT_PREPARATION_DOCUMENTS = gql`
  query {
    project_preparation_documents {
      id
      name
    }
  }
`;

export const FETCH_GADS_QUERY = gql`
  query {
    gads {
      id
      name
    }
  }
`;

export const FETCH_REVIEW_QUERY = gql`
  query project($id: ID!) {
    project(id: $id) {
      id
      review {
        id
        typology_id
        cip_type_id
        cip_type {
          id
        }
        trip
        cip
        within_period
        readiness_id
        readiness {
          id
        }
        reviewer {
          id
        }
        selected_sustainable_development_goals
        sustainable_development_goals {
          id
          name
        }
        selected_ten_point_agenda
        ten_point_agenda {
          id
          name
        }
        selected_paradigms
        paradigms {
          id
          name
        }
        selected_pdp_chapters
        pdp_chapters {
          id
          name
        }
        selected_pdp_indicators
        pdp_indicators {
          id
          name
        }
        selected_bases
        bases {
          id
          name
        }
        remarks
        reviewed_by
        reviewer {
          id
          name
        }
        created_at
        updated_at
      }
    }
  }
`;

export const PDP_CHAPTERS_QUERY = gql`
  {
    pdp_chapters {
      id
      name
    }
  }
`;

export const CIP_TYPES_QUERY = gql`
  {
    cip_types {
      id
      name
    }
  }
`;

export const READINESSES_QUERY = gql`
  {
    readinesses {
      id
      name
    }
  }
`;

export const BASES_QUERY = gql`
  {
    bases {
      id
      name
    }
  }
`;

export const PARADIGMS_QUERY = gql`
  {
    paradigms {
      id
      name
    }
  }
`;

export const TEN_POINT_AGENDA_QUERY = gql`
  {
    ten_point_agenda {
      id
      name
    }
  }
`;

export const SDG_QUERY = gql`
  {
    sustainable_development_goals {
      id
      name
      description
    }
  }
`;

export const FETCH_VERSIONS = gql`
  {
    versions {
      id
      version
      change_log
      change_type
      notes
      user {
        id
        name
      }
      created_at
    }
  }
`;

export const FETCH_VERSION = gql`
  query($id: ID!) {
    version(id: $id) {
      id
      version
      change_log
      change_type
      notes
      user {
        id
        name
      }
    }
  }
`;

export const CURRENT_VERSION = gql`
  query {
    currentVersion {
      id
      change_log
      change_type
      notes
      version
    }
  }
`;

export const PROCESSING_STATUSES = gql`
  query {
    processing_statuses {
      id
      name
      count_projects
    }
  }
`;

export const ATTACHMENT_TYPES = gql`
  query {
    attachment_types {
      id
      name
    }
  }
`;

export const VIEW_SHARED_PROJECT = gql`
  query($id: ID!, $token: String!) {
    viewSharedProject(id: $id, token: $token) {
      id
      afmip
      approved
      bases {
        id
        name
      }
      beneficiaries
      cities_municipalities
      cip
      city_municipality_id
      city_municipality {
        id
        name
      }
      clearinghouse
      clearinghouse_date
      creator {
        id
        name
      }
      created_at
      currency_id
      currency {
        id
        name
      }
      components
      description
      disbursement_2016
      disbursement_2017
      disbursement_2018
      disbursement_2019
      disbursement_2020
      disbursement_2021
      disbursement_2022
      disbursement_2023
      disbursement_total
      district_id
      district {
        id
        name
      }
      employment_generated
      encoded
      endorsed
      endorsement {
        id
        dropbox_link
      }
      estimated_project_life
      economic_benefit_cost_ratio
      economic_internal_rate_return
      economic_net_present_value
      expected_outputs
      finalized
      financial_benefit_cost_ratio
      financial_internal_rate_return
      financial_net_present_value
      fs_target_2017
      fs_target_2018
      fs_target_2019
      fs_target_2020
      fs_target_2021
      fs_target_2022
      fs_target_total
      funding_institution_id
      funding_institution {
        id
        name
      }
      funding_sources {
        id
        name
        pivot {
          target_2016
          target_2017
          target_2018
          target_2019
          target_2020
          target_2021
          target_2022
          target_2023
          target_total
        }
      }
      gaa_2016
      gaa_2017
      gaa_2018
      gaa_2019
      gaa_2020
      gaa_2021
      gaa_2022
      gaa_2023
      gaa_total
      gad_id
      gad {
        id
        name
      }
      goals
      has_fs
      has_rap
      has_row
      icc_approved
      icc_approved_date
      icc_endorsed
      icc_endorsed_date
      image_url
      implementation_start_date
      implementation_end_date
      implementation_mode_id
      implementation_mode {
        id
        name
      }
      implementation_risk
      income_increase
      infrastructure
      infrastructure_target_2016
      infrastructure_target_2017
      infrastructure_target_2018
      infrastructure_target_2019
      infrastructure_target_2020
      infrastructure_target_2021
      infrastructure_target_2022
      infrastructure_target_2023
      infrastructure_target_total
      investment_target_2016
      investment_target_2017
      investment_target_2018
      investment_target_2019
      investment_target_2020
      investment_target_2021
      investment_target_2022
      investment_target_2023
      investment_target_total
      main_funding_source_id
      main_funding_source {
        id
        name
      }
      mitigation_strategy
      neda_board
      neda_board_date
      neda_submission
      neda_submission_date
      neda_secretariat_review
      neda_secretariat_review_date
      nep_2016
      nep_2017
      nep_2018
      nep_2019
      nep_2020
      nep_2021
      nep_2022
      nep_2023
      nep_total
      operating_unit_id
      operating_unit {
        id
        name
        image_url
      }
      outcomes
      pcip
      pip
      priority_ranking
      project_processing_statuses {
        id
        processing_status {
          id
          name
        }
        processor {
          id
          name
        }
        remarks
        processed_at
      }
      project_status_id
      project_status {
        id
        name
      }
      province_id
      province {
        id
        name
      }
      provinces {
        id
        name
      }
      purpose
      rap_affected
      rap_target_2017
      rap_target_2018
      rap_target_2019
      rap_target_2020
      rap_target_2021
      rap_target_2022
      rap_target_total
      rdip
      region_id
      regions {
        id
        name
        pivot {
          target_2016
          target_2017
          target_2018
          target_2019
          target_2020
          target_2021
          target_2022
          target_2023
          target_total
        }
      }
      reviewed
      row_affected
      row_target_2017
      row_target_2018
      row_target_2019
      row_target_2020
      row_target_2021
      row_target_2022
      row_target_total
      selected_regions
      signed_copy
      spatial_coverage_id
      spatial_coverage {
        id
        name
      }
      target_end_year
      target_start_year
      technical_readinesses {
        id
        name
      }
      tier_id
      tier {
        id
        name
      }
      title
      total_project_cost
      trip
      type_id
      type {
        id
        name
      }
      updates
      updates_date
      updated_at
      latest_processing_status {
        id
        processing_status {
          id
          name
        }
      }
      processing_status {
        id
        name
      }
      latest_status
      signed_copy
      attachments {
        id
        attachment_type {
          id
          name
        }
        dropbox_link
        file_size
      }
      review {
        id
        pip
        typology {
          id
          name
        }
        cip
        cip_type {
          id
          name
        }
        trip
        within_period
        readiness {
          id
          name
        }
        remarks
        reviewer {
          id
          name
        }
        sustainable_development_goals {
          id
          name
        }
        ten_point_agenda {
          id
          name
        }
        bases {
          id
          name
        }
        paradigms {
          id
          name
        }
        pdp_indicators {
          id
          name
        }
        pdp_chapters {
          id
          name
        }
        created_at
        updated_at
      }
      validation_data
      validation_signed
      validation_endorsed
    }
  }
`;

export const FINALIZED_PROJECTS = gql`
  query {
    finalizedProjects {
      id
      title
      total_project_cost
      currency {
        id
        name
      }
      creator {
        id
      }
    }
  }
`;

export const DOWNLOAD_PROJECT = gql`
  query($id: ID!) {
    project(id: $id) {
      ...projectFragment
    }
  }
	${PROJECT_FRAGMENT}
`;

export const COST_STRUCTURES = gql`
  query {
    cost_structures {
      id
      name
    }
  }
`;

export const PREXC_PROGRAMS = gql`
  query {
    prexc_programs {
      id
      name
      cost_structure_id
      cost_structure {
        id
        name
      }
    }
  }
`;

export const PREXC_SUBPROGRAMS = gql`
  query {
    prexc_subprograms {
      id
      name
      prexc_program_id
    }
  }
`;

export const PREXC_ACTIVITIES = gql`
  query {
    prexc_activities {
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
`;

export const PREXC_PROGRAM = gql`
  query($id: ID!) {
    prexc_program(id: $id) {
      id
      name
      acronym
      uacs_code
      organizational_outcome
      objective_statement
      prexc_subprograms {
        id
        name
        acronym
        uacs_code
      }
    }
  }
`;

export const PREXC_SUBPROGRAM = gql`
  query($id: ID!) {
    prexc_subprogram(id: $id) {
      id
      name
      acronym
      uacs_code
      organizational_outcome
      objective_statement
      outcome_indicators
      output_indicators
      prexc_activities {
        id
        name
        acronym
        uacs_code
      }
    }
  }
`;

export const PREXC_ACTIVITY = gql`
  query($id: ID!) {
    prexc_activity(id: $id) {
      ...prexcActivityFragment
    }
  }
  ${PREXC_ACTIVITY_FRAGMENT}
`;

export const INFRASTRUCTURE_SECTORS = gql`
  query {
    infrastructure_sectors {
      id
      label
      children {
        id
        label
      }
    }
  }
`;

export const SUBMISSION_STATUSES = gql`
  query {
    submission_statuses {
      id
      name
    }
  }
`;

export const BANNER_PROGRAMS = gql`
  query {
    banner_programs {
      id
      name
      acronym
    }
  }
`

export const FETCH_ANNOUNCEMENTS = gql`
	query {
		announcements {
			id
			subject
			message
			created_at
			created_by
		}
	}
`
