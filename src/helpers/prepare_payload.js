export const preparePayload = project => {
  const disbursement_total =
    parseFloat(project.disbursement_2016) ||
    0 + parseFloat(project.disbursement_2017) ||
    0 + parseFloat(project.disbursement_2018) ||
    0 + parseFloat(project.disbursement_2019) ||
    0 + parseFloat(project.disbursement_2020) ||
    0;

  const gaa_total =
    parseFloat(project.gaa_2016) ||
    0 + parseFloat(project.gaa_2017) ||
    0 + parseFloat(project.gaa_2018) ||
    0 + parseFloat(project.gaa_2019) ||
    0 + parseFloat(project.gaa_2020) ||
    0;

  const nep_total =
    parseFloat(project.nep_2016) ||
    0 + parseFloat(project.nep_2017) ||
    0 + parseFloat(project.nep_2018) ||
    0 + parseFloat(project.nep_2019) ||
    0 + parseFloat(project.nep_2020) ||
    0 + parseFloat(project.nep_2021) ||
    0;

  const investment_target_total =
    parseFloat(project.investment_target_2016) ||
    0 + parseFloat(project.investment_target_2017) ||
    0 + parseFloat(project.investment_target_2018) ||
    0 + parseFloat(project.investment_target_2019) ||
    0 + parseFloat(project.investment_target_2020) ||
    0 + parseFloat(project.investment_target_2021) ||
    0 + parseFloat(project.investment_target_2022) ||
    0 + parseFloat(project.investment_target_2023) ||
    0 + parseFloat(project.investment_target_2024) ||
    0 + parseFloat(project.investment_target_2025) ||
    0;

  const infrastructure_target_total =
    parseFloat(project.infrastructure_target_2016) ||
    0 + parseFloat(project.infrastructure_target_2017) ||
    0 + parseFloat(project.infrastructure_target_2018) ||
    0 + parseFloat(project.infrastructure_target_2019) ||
    0 + parseFloat(project.infrastructure_target_2020) ||
    0 + parseFloat(project.infrastructure_target_2021) ||
    0 + parseFloat(project.infrastructure_target_2022) ||
    0 + parseFloat(project.infrastructure_target_2023) ||
    0 + parseFloat(project.infrastructure_target_2024) ||
    0 + parseFloat(project.infrastructure_target_2025) ||
    0;

  const payload = {
    id: project.id,
    pip: project.pip,
    cip: project.cip,
    trip: project.trip,
    rdip: project.rdip,
    title: project.title,
    type_id: project.type_id,
    operating_unit_id: project.operating_unit_id,
    implementation_mode_id: project.implementation_mode_id,
    project_status_id: project.project_status_id,
    typology_id: project.typology_id,
    tier_id: project.tier_id,
    spatial_coverage_id: project.spatial_coverage_id,
    description: project.description,
    expected_outputs: project.expected_outputs,
    employment_generated: project.employment_generated,
    target_start_year: project.target_start_year,
    target_end_year: project.target_end_year,
    clearinghouse: project.clearinghouse,
    clearinghouse_date: project.clearinghouse_date,
    neda_submission: project.neda_submission,
    neda_submission_date: project.neda_submission_date,
    neda_secretariat_review: project.neda_secretariat_review,
    neda_secretariat_review_date: project.neda_secretariat_review_date,
    icc_endorsed: project.icc_endorsed,
    icc_endorsed_date: project.icc_endorsed_date,
    icc_approved: project.icc_approved,
    icc_approved_date: project.icc_approved_date,
    neda_board: project.neda_board,
    neda_board_date: project.neda_board_date,
    total_project_cost: project.total_project_cost,
    implementation_risk: project.implementation_risk,
    gad_id: project.gad_id,
    main_funding_source_id: project.main_funding_source_id,
    funding_sources: {
      sync: project.selected_funding_sources
    },
    funding_institution_id: project.funding_institution_id,
    has_fs: project.has_fs,
    has_row: project.has_row,
    has_rap: project.has_rap,
    fs_target_2017: project.fs_target_2017,
    fs_target_2018: project.fs_target_2018,
    fs_target_2019: project.fs_target_2019,
    fs_target_2020: project.fs_target_2020,
    fs_target_2021: project.fs_target_2021,
    fs_target_2022: project.fs_target_2022,
    fs_target_total: project.fs_target_total,
    row_target_2017: project.row_target_2017,
    row_target_2018: project.row_target_2018,
    row_target_2019: project.row_target_2019,
    row_target_2020: project.row_target_2020,
    row_target_2021: project.row_target_2021,
    row_target_2022: project.row_target_2022,
    row_target_total: project.row_target_total,
    row_affected: project.row_affected,
    rap_target_2017: project.rap_target_2017,
    rap_target_2018: project.rap_target_2018,
    rap_target_2019: project.rap_target_2019,
    rap_target_2020: project.rap_target_2020,
    rap_target_2021: project.rap_target_2021,
    rap_target_2022: project.rap_target_2022,
    rap_target_total: project.rap_target_total,
    rap_affected: project.rap_affected,
    investment_target_2016: project.investment_target_2016,
    investment_target_2017: project.investment_target_2017,
    investment_target_2018: project.investment_target_2018,
    investment_target_2019: project.investment_target_2019,
    investment_target_2020: project.investment_target_2020,
    investment_target_2021: project.investment_target_2021,
    investment_target_2022: project.investment_target_2022,
    investment_target_2023: project.investment_target_2023,
    investment_target_2024: project.investment_target_2024,
    investment_target_2025: project.investment_target_2025,
    investment_target_total: investment_target_total,
    infrastructure_target_2016: project.infrastructure_target_2016,
    infrastructure_target_2017: project.infrastructure_target_2017,
    infrastructure_target_2018: project.infrastructure_target_2018,
    infrastructure_target_2019: project.infrastructure_target_2019,
    infrastructure_target_2020: project.infrastructure_target_2020,
    infrastructure_target_2021: project.infrastructure_target_2021,
    infrastructure_target_2022: project.infrastructure_target_2022,
    infrastructure_target_2023: project.infrastructure_target_2023,
    infrastructure_target_2024: project.infrastructure_target_2024,
    infrastructure_target_2025: project.infrastructure_target_2025,
    infrastructure_target_total: infrastructure_target_total,
    nep_2016: project.nep_2016,
    nep_2017: project.nep_2017,
    nep_2018: project.nep_2018,
    nep_2019: project.nep_2019,
    nep_2020: project.nep_2020,
    nep_2021: project.nep_2021,
    // nep_2022: project.nep_2022,
    // nep_2023: project.nep_2023,
    // nep_2024: project.nep_2024,
    // nep_2025: project.nep_2025,
    nep_total: nep_total,
    gaa_2016: project.gaa_2016,
    gaa_2017: project.gaa_2017,
    gaa_2018: project.gaa_2018,
    gaa_2019: project.gaa_2019,
    gaa_2020: project.gaa_2020,
    // gaa_2021: project.gaa_2021,
    // gaa_2022: project.gaa_2022,
    // gaa_2023: project.gaa_2023,
    // gaa_2024: project.gaa_2024,
    // gaa_2025: project.gaa_2025,
    gaa_total: gaa_total,
    disbursement_2016: project.disbursement_2016,
    disbursement_2017: project.disbursement_2017,
    disbursement_2018: project.disbursement_2018,
    disbursement_2019: project.disbursement_2019,
    disbursement_2020: project.disbursement_2020,
    // disbursement_2021: project.disbursement_2021,
    // disbursement_2022: project.disbursement_2022,
    // disbursement_2023: project.disbursement_2023,
    // disbursement_2024: project.disbursement_2024,
    // disbursement_2025: project.disbursement_2025,
    disbursement_total: disbursement_total,
    bases: {
      sync: project.selected_bases
    },
    pdp_chapter_id: project.pdp_chapter_id,
    pdp_indicators: {
      sync: project.selected_pdp_indicators
    },
    pdp_chapters: {
      sync: project.selected_pdp_chapters
    },
    project_preparation_document_id: project.project_preparation_document_id,
    project_preparation_document_others:
      project.project_preparation_document_others,
    rdc_endorsed: project.rdc_endorsed,
    rdc_endorsed_date: project.rdc_endorsed_date,
    rdc_required: project.rdc_required,
    region_id: project.region_id,
    ten_point_agenda: {
      sync: project.selected_ten_point_agenda
    },
    technical_readinesses: {
      sync: project.selected_technical_readinesses
    },
    infrastructure_subsectors: {
      sync: project.selected_infrastructure_subsectors
    },
    // },
    updates: project.updates,
    updates_date: project.updates_date,
    regions: {
      sync: project.selected_regions
    },
    uacs_code: project.uacs_code,
    version: project.version,
    sustainable_development_goals: {
      sync: project.selected_sustainable_development_goals
    },
    cip_type_id: project.cip_type_id
  };

  console.dir(payload);

  return payload;
};
