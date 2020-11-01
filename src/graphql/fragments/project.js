import gql from 'graphql-tag';

export const PROJECT_FRAGMENT = gql`
  fragment projectFragment on Project {
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
    cip_type_id
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
      position
    }
    created_at
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
      link
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
    fs_target_2023
    fs_target_2024
    fs_target_2025
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
    iccable
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
      acronym
      agency_head_name
      agency_head_designation
      image_url
    }
    outcomes
    pcip
    pdp_chapter_id
		pdp_indicators {
			id
			name
		}
    pip
    priority_ranking
    processing_status {
      id
      name
    }
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
    rdc_endorsed_date
    rdc_endorsed
    rdc_required
    rdip
    region_id
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
    total_project_cost
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
	  sustainable_development_goals {
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
    selected_bases
    validation_data
    validation_signed
    validated
    project_preparation_document_id
    project_preparation_document_others
    version
  }
`;
