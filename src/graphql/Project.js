import gql from 'graphql-tag'

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

export const PROJECT_FRAGMENT = gql`
  fragment projectFragment on Project {
    id
    slug
    banner_program_id
    banner_program {
      id
      name
    }
    bases {
      id
      name
    }
    cip
    cip_type_id
    cip_type {
      id
      name
    }
    clearinghouse
    clearinghouse_date
    creator {
      id
      name
      email
    }
    created_at
    description
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
    employment_generated
    expected_outputs
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
    }
    funding_source_financials {
      id
      funding_source_id
      funding_source {
        id
        name
      }
      project_id
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
    }
    funding_source_infrastructures {
      id
      funding_source_id
      funding_source {
        id
        name
      }
      project_id
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
    }
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
    gad_id
    gad {
      id
      name
    }
    has_fs
    has_rap
    has_row
    iccable
    icc_approved
    icc_approved_date
    icc_endorsed
    icc_endorsed_date
    implementation_start_date
    implementation_end_date
    implementation_mode_id
    implementation_mode {
      id
      name
    }
    implementation_risk
    infrastructure_subsectors {
      id
      name
    }
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
    main_funding_source_id
    main_funding_source {
      id
      name
    }
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
      acronym
      agency_head_name
      agency_head_designation
      image_url
    }
    pdp_chapter_id
    pdp_chapter {
      id
      name
    }
    pdp_indicators {
      id
      name
    }
    pip
    prexc_activity_id
    prexc_program_id
    prexc_program {
      id
      name
      acronym
    }
    prexc_subprogram_id
    prexc_subprogram {
      id
      name
      acronym
    }
    project_status_id
    project_status {
      id
      name
    }
    rap_affected
    rap_target_2017
    rap_target_2018
    rap_target_2019
    rap_target_2020
    rap_target_2021
    rap_target_2022
    rap_target_total
    rdc_endorsed_date
    rdc_endorsed
    rdc_required
    rdip
    region_id
    region {
      id
      name
    }
    regions {
      id
      name
    }
    region_financials {
      id
      region_id
      region {
        id
        name
      }
      project_id
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
    }
    row_affected
    row_target_2017
    row_target_2018
    row_target_2019
    row_target_2020
    row_target_2021
    row_target_2022
    row_target_total
    selected_regions
    selected_infrastructure_subsectors
    selected_technical_readinesses
    selected_pdp_chapters
    selected_pdp_indicators
    selected_ten_point_agenda
    selected_sustainable_development_goals
    selected_funding_sources
    signed_copy
    signed_copy_link
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
    ten_point_agenda {
      id
      name
    }
    tier_id
    tier {
      id
      name
    }
    title
    trip
    type_id
    type {
      id
      name
    }
    typology_id
    typology {
      id
      name
    }
    uacs_code
    updates
    updates_date
    updated_at
    updater {
      id
      name
    }
    sustainable_development_goals {
      id
      name
    }
    signed_copy
    selected_bases
    submission_status {
      id
      name
    }
    created_by
    pipol_status {
      id
      name
    }
    pipol_status_id
    pipol_code
    selected_implementing_agencies
    permissions {
      view
      update
      delete
      restore
    }
  }
`;

/* Queries */
export const PROJECTS = gql`
  query (
    $where: ProjectsWhereWhereConditions
    $orderBy: [ProjectsOrderByOrderByClause!]
    $first: Int!
    $page: Int!
  ) {
    projects(
      where: $where
      orderBy: $orderBy
      first: $first
      page: $page
    ) {
      data {
        ...basicInformation
      }
      paginatorInfo {
        currentPage
        lastPage
        perPage
        total
      }
    }
  }
  ${BASIC_INFORMATION_FRAGMENT}
`

export const SEARCH_PROJECTS = gql`
  query searchProjects(
    $search: String!
    $first: Int!
    $page: Int!
  ) {
    searchProjects(
      search: $search
      first: $first
      page: $page
    ) {
      data {
        ...basicInformation
      }
      paginatorInfo {
        currentPage
        lastPage
        perPage
        total
      }
    }
  }
  ${BASIC_INFORMATION_FRAGMENT}
`;

export const OWNED_PROJECTS = gql`
  query (
    $first: Int!
    $page: Int!
  ) {
    ownProjects (
      first: $first
      page: $page
    ) {
      data {
        ...projectFragment
      }
      paginatorInfo {
        total
        lastPage
        currentPage
      }
    }
  }
  ${PROJECT_FRAGMENT}
`

export const PROJECT_FIND_BY_SLUG = gql`
  query (
    $slug: String!
  ) {
    projectFindBySlug(
      slug: $slug
    ) {
      ...projectFragment
    }
  }
  ${PROJECT_FRAGMENT}
`;

/* Mutations */

export const CREATE_PROJECT_MUTATION = gql`
  mutation createProject(
    $title: String!
    $type_id: ID!
  ) {
    createProject(
      input: {
        title: $title
        type_id: $type_id
      }
    ) {
      ...projectFragment
    }
  }
  ${PROJECT_FRAGMENT}
`;

export const UPDATE_PROJECT_MUTATION = gql`
  mutation updateProject(
    $id: ID!
    $title: String!
    $banner_program_id: ID
    $type_id: ID
    $bases: UpdateBasesBelongsToMany
    $description: String
    $operating_unit_id: ID
    $spatial_coverage_id: ID
    $regions: UpdateRegionsBelongsToMany
    $region_id: ID
    $pip: Boolean
    $typology_id: ID
    $cip: Boolean
    $cip_type_id: ID
    $trip: Boolean
    $rdip: Boolean
    $rdc_endorsed: Boolean
    $rdc_endorsed_date: String
    $infrastructure_subsectors: UpdateInfrastructureSubsectorsBelongsToMany
    $technical_readinesses: UpdateTechnicalReadinessesBelongsToMany
    $implementation_risk: String
    $project_status_id: ID
    $iccable: Boolean
    $clearinghouse: Boolean
    $clearinghouse_date: String
    $neda_submission: Boolean
    $neda_submission_date: String
    $neda_secretariat_review: Boolean
    $neda_secretariat_review_date: String
    $icc_endorsed: Boolean
    $icc_endorsed_date: String
    $icc_approved: Boolean
    $icc_approved_date: String
    $neda_board: Boolean
    $neda_board_date: String
    $tier_id: ID
    $uacs_code: String
    $updates: String
    $updates_date: String
    $pdp_chapter_id: ID
    $pdp_chapters: UpdatePdpChaptersBelongsToMany
    $pdp_indicators: UpdatePdpIndicatorsBelongsToMany
    $expected_outputs: String
    $ten_point_agenda: UpdateTenPointAgendaBelongsToMany
    $sustainable_development_goals: UpdateSustainableDevelopmentGoalsBelongsToMany
    $gad_id: ID
    $target_start_year: Int
    $target_end_year: Int
    $project_preparation_document_id: ID
    $has_fs: Boolean
    $fs_target_2017: Float
    $fs_target_2018: Float
    $fs_target_2019: Float
    $fs_target_2020: Float
    $fs_target_2021: Float
    $fs_target_2022: Float
    $project_preparation_document_others: String
    $has_row: Boolean
    $row_target_2017: Float
    $row_target_2018: Float
    $row_target_2019: Float
    $row_target_2020: Float
    $row_target_2021: Float
    $row_target_2022: Float
    $row_affected: String
    $has_rap: Boolean
    $rap_target_2017: Float
    $rap_target_2018: Float
    $rap_target_2019: Float
    $rap_target_2020: Float
    $rap_target_2021: Float
    $rap_target_2022: Float
    $rap_affected: String
    $employment_generated: String
    $main_funding_source_id: ID
    $funding_sources: UpdateFundingSourcesBelongsToMany
    $funding_institution_id: ID
    $implementation_mode_id: ID
    $nep_2016: Float
    $nep_2017: Float
    $nep_2018: Float
    $nep_2019: Float
    $nep_2020: Float
    $nep_2021: Float
    $gaa_2016: Float
    $gaa_2017: Float
    $gaa_2018: Float
    $gaa_2019: Float
    $gaa_2020: Float
    $disbursement_2016: Float
    $disbursement_2017: Float
    $disbursement_2018: Float
    $disbursement_2019: Float
    $disbursement_2020: Float
    $prexc_program_id: ID
    $prexc_subprogram_id: ID
  ) {
    updateProject(
      input: {
        id: $id
        title: $title
        banner_program_id: $banner_program_id
        type_id: $type_id
        bases: $bases
        description: $description
        operating_unit_id: $operating_unit_id
        spatial_coverage_id: $spatial_coverage_id
        regions: $regions
        region_id: $region_id
        pip: $pip
        typology_id: $typology_id
        cip: $cip
        cip_type_id: $cip_type_id
        trip: $trip
        rdip: $rdip
        rdc_endorsed: $rdc_endorsed
        rdc_endorsed_date: $rdc_endorsed_date
        infrastructure_subsectors: $infrastructure_subsectors
        technical_readinesses: $technical_readinesses
        implementation_risk: $implementation_risk
        project_status_id: $project_status_id
        iccable: $iccable
        clearinghouse: $clearinghouse
        clearinghouse_date: $clearinghouse_date
        neda_submission: $neda_submission
        neda_submission_date: $neda_submission_date
        neda_secretariat_review: $neda_secretariat_review
        neda_secretariat_review_date: $neda_secretariat_review_date
        icc_endorsed: $icc_endorsed
        icc_endorsed_date: $icc_endorsed_date
        icc_approved: $icc_approved
        icc_approved_date: $icc_approved_date
        neda_board: $neda_board
        neda_board_date: $neda_board_date
        tier_id: $tier_id
        uacs_code: $uacs_code
        updates: $updates
        updates_date: $updates_date
        pdp_chapter_id: $pdp_chapter_id
        pdp_chapters: $pdp_chapters
        pdp_indicators: $pdp_indicators
        expected_outputs: $expected_outputs
        ten_point_agenda: $ten_point_agenda
        sustainable_development_goals: $sustainable_development_goals
        gad_id: $gad_id
        target_start_year: $target_start_year
        target_end_year: $target_end_year
        project_preparation_document_id: $project_preparation_document_id
        has_fs: $has_fs
        fs_target_2017: $fs_target_2017
        fs_target_2018: $fs_target_2018
        fs_target_2019: $fs_target_2019
        fs_target_2020: $fs_target_2020
        fs_target_2021: $fs_target_2021
        fs_target_2022: $fs_target_2022
        project_preparation_document_others: $project_preparation_document_others
        has_row: $has_row
        row_target_2017: $row_target_2017
        row_target_2018: $row_target_2018
        row_target_2019: $row_target_2019
        row_target_2020: $row_target_2020
        row_target_2021: $row_target_2021
        row_target_2022: $row_target_2022
        row_affected: $row_affected
        has_rap: $has_rap
        rap_target_2017: $rap_target_2017
        rap_target_2018: $rap_target_2018
        rap_target_2019: $rap_target_2019
        rap_target_2020: $rap_target_2020
        rap_target_2021: $rap_target_2021
        rap_target_2022: $rap_target_2022
        rap_affected: $rap_affected
        employment_generated: $employment_generated
        main_funding_source_id: $main_funding_source_id
        funding_sources: $funding_sources
        funding_institution_id: $funding_institution_id
        implementation_mode_id: $implementation_mode_id
        nep_2016: $nep_2016
        nep_2017: $nep_2017
        nep_2018: $nep_2018
        nep_2019: $nep_2019
        nep_2020: $nep_2020
        nep_2021: $nep_2021
        gaa_2016: $gaa_2016
        gaa_2017: $gaa_2017
        gaa_2018: $gaa_2018
        gaa_2019: $gaa_2019
        gaa_2020: $gaa_2020
        disbursement_2016: $disbursement_2016
        disbursement_2017: $disbursement_2017
        disbursement_2018: $disbursement_2018
        disbursement_2019: $disbursement_2019
        disbursement_2020: $disbursement_2020
        prexc_program_id: $prexc_program_id
        prexc_subprogram_id: $prexc_subprogram_id
      }
    ) {
      ...projectFragment
    }
  }
  ${PROJECT_FRAGMENT}
`;

export const RECLASSIFY_PROJECT = gql`
  mutation (
    $id: ID!
    $banner_program_id: ID
  ) {
    reclassifyProject(
      id: $id
      banner_program_id: $banner_program_id
    ) {
      ...basicInformation
    }
  }
  ${BASIC_INFORMATION_FRAGMENT}
`;

export const REVERT_TO_DRAFT_PROJECT = gql`
  mutation ($id: ID!) {
    revertToDraftProject(id: $id) {
      ...basicInformation
    }
  }
  ${BASIC_INFORMATION_FRAGMENT}
`
