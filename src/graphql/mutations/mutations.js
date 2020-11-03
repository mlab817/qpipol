import gql from 'graphql-tag';
import { PROJECT_FRAGMENT, PREXC_ACTIVITY_FRAGMENT } from '../fragments';

/* Auth */

export const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(input: { username: $username, password: $password }) {
      access_token
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation logout {
    logout {
      status
      message
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation register(
    $name: String!
    $email: String!
    $password: String!
    $password_confirmation: String!
  ) {
    register(
      input: {
        name: $name
        email: $email
        password: $password
        password_confirmation: $password_confirmation
      }
    ) {
      tokens {
        access_token
      }
      status
    }
  }
`;

export const RESEND_EMAIL_VERIFICATION_MUTATION = gql`
  mutation resendEmailVerification($email: String!) {
    resendEmailVerification(input: { email: $email }) {
      message
    }
  }
`;

export const VERIFY_EMAIL_MUTATION = gql`
  mutation verifyEmail($token: String!) {
    verifyEmail(input: { token: $token }) {
      access_token
    }
  }
`;

export const UPDATE_PASSWORD_MUTATION = gql`
  mutation updatePassword(
    $old_password: String!
    $password: String!
    $password_confirmation: String!
  ) {
    updatePassword(
      input: {
        old_password: $old_password
        password: $password
        password_confirmation: $password_confirmation
      }
    ) {
      status
      message
    }
  }
`;

export const FORGOT_PASSWORD_MUTATION = gql`
  mutation forgotPassword($email: String!) {
    forgotPassword(input: { email: $email }) {
      status
      message
    }
  }
`;

export const UPDATE_FORGOTTEN_PASSWORD = gql`
  mutation(
    $email: String!
    $token: String!
    $password: String!
    $password_confirmation: String!
  ) {
    updateForgottenPassword(
      input: {
        email: $email
        token: $token
        password: $password
        password_confirmation: $password_confirmation
      }
    ) {
      status
      message
    }
  }
`;

/* Profile */
export const UPLOAD_USER_AVATAR_MUTATION = gql`
  mutation uploadUserAvatar($image: Upload!) {
    uploadUserAvatar(image: $image) {
      id
      user_avatar
    }
  }
`;

export const CHOOSE_AVATAR_MUTATION = gql`
  mutation chooseAvatar($image_id: ID!) {
    chooseAvatar(image_id: $image_id) {
      id
      user_avatar
    }
  }
`;

export const UPDATE_PROFILE_MUTATION = gql`
  mutation updateUser(
    $name: String
    $nickname: String
    $operating_unit_id: ID
    $position: String
    $contact_number: String
  ) {
    updateUser(
      input: {
        name: $name
        nickname: $nickname
        operating_unit_id: $operating_unit_id
        position: $position
        contact_number: $contact_number
      }
    ) {
      id
      name
      nickname
      position
      contact_number
      operating_unit {
        id
        name
        image
      }
    }
  }
`;

/* Notifications */

export const MARK_AS_READ_MUTATION = gql`
  mutation markAsRead($id: ID!) {
    markAsRead(id: $id) {
      id
    }
  }
`;

export const MARK_ALL_AS_READ_MUTATION = gql`
  mutation markAllAsRead {
    markAllAsRead {
      status
    }
  }
`;

/* Projects */
export const CREATE_PROJECT_MUTATION = gql`
  mutation createProject(
    $prexc_program_id: ID
    $prexc_subprogram_id: ID
    $title: String!
    $operating_unit_id: ID
  ) {
    createProject(
      input: {
        prexc_program_id: $prexc_program_id
        prexc_subprogram_id: $prexc_subprogram_id
        title: $title
        operating_unit_id: $operating_unit_id
      }
    ) {
      ...projectFragment
    }
  }
  ${PROJECT_FRAGMENT}
`;

export const CREATE_PROJECT_MUTATION_V2 = gql`
  mutation createProject(
    $prexc_program_id: ID
    $prexc_subprogram_id: ID
    $title: String!
    $type_id: ID
    $infrastructure: Boolean
    $operating_unit_id: ID
    $main_funding_source_id: ID
    $project_status_id: ID
    $tier_id: ID
    $spatial_coverage_id: ID
    $description: String
    $target_start_year: Int
    $target_end_year: Int
    $currency_id: ID
    $total_project_cost: Float
  ) {
    createProject(
      input: {
        prexc_program_id: $prexc_program_id
        prexc_subprogram_id: $prexc_subprogram_id
        title: $title
        type_id: $type_id
        infrastructure: $infrastructure
        operating_unit_id: $operating_unit_id
        main_funding_source_id: $main_funding_source_id
        project_status_id: $project_status_id
        tier_id: $tier_id
        spatial_coverage_id: $spatial_coverage_id
        description: $description
        target_start_year: $target_start_year
        target_end_year: $target_end_year
        currency_id: $currency_id
        total_project_cost: $total_project_cost
      }
    ) {
      ...projectFragment
    }
  }
  ${PROJECT_FRAGMENT}
`;

export const RESTORE_PROJECT_MUTATION = gql`
  mutation restoreProject($id: ID!) {
    restoreProject(id: $id) {
      id
      title
      type {
        id
        name
      }
      operating_unit {
        id
        acronym
        image
      }
      updatedAt
      processing_status {
        id
        name
      }
      creator {
        id
        nickname
      }
      finalized
      total_project_cost
      main_funding_source {
        id
        name
      }
    }
  }
`;

export const CREATE_GAD_FORM = gql`
  mutation createGadForm($project_id: ID!, $gad_form: Upload!) {
    createGadForm(project_id: $project_id, gad_form: $gad_form) {
      id
    }
  }
`;

export const ASSESS_GAD_RESPONSIVENESS = gql`
  mutation assessGadResponsiveness(
    $id: ID!
    $project_gad_subquestions: UpdateProjectGadSubquestionHasMany
  ) {
    assessGadResponsiveness(
      input: { id: $id, project_gad_subquestions: $project_gad_subquestions }
    ) {
      id
      project_gad_subquestions {
        id
        gad_subquestion_id
        gad_choice_id
      }
    }
  }
`;

export const ENDORSE_PROJECTS_MUTATION = gql`
  mutation endorseProjects($projects: [ID!]!, $file: Upload!) {
    endorseProjects(projects: $projects, file: $file) {
      id
      file_name
      file_path
      file_size
      file_type
      dropbox_link
      projects {
        id
        title
      }
    }
  }
`;

export const DELETE_PROJECT_MUTATION = gql`
  mutation deleteProject($id: ID!) {
    deleteProject(id: $id) {
      status
      message
      project {
        id
        title
      }
    }
  }
`;

export const FORCE_DELETE_PROJECT_MUTATION = gql`
  mutation forceDeleteProject($id: ID!) {
    forceDeleteProject(id: $id) {
      id
      title
    }
  }
`;

export const REVIEW_PROJECT_MUTATION = gql`
  mutation reviewProject(
    $id: ID!
    $ten_point_agenda: UpdateTenPointAgendaRelation
    $sustainable_development_goals: UpdateSustainableDevelopmentGoalRelation
    $paradigms: UpdateParadigmsRelation
    $pdp_chapters: UpdatePdpChaptersRelation
    $pdp_indicators: UpdatePdpIndicatorsRelation
    $bases: UpdateBasisRelation
    $review: ProjectReviewBelongsTo
  ) {
    reviewProject(
      input: {
        id: $id
        ten_point_agenda: $ten_point_agenda
        sustainable_development_goals: $sustainable_development_goals
        paradigms: $paradigms
        pdp_chapters: $pdp_chapters
        pdp_indicators: $pdp_indicators
        bases: $bases
        review: $review
      }
    ) {
      id
      selected_sustainable_development_goals
      sustainable_development_goals {
        id
      }
      selected_ten_point_agenda
      ten_point_agenda {
        id
      }
      selected_paradigms
      paradigms {
        id
      }
      selected_pdp_chapters
      pdp_chapters {
        id
      }
      selected_pdp_indicators
      pdp_indicators {
        id
      }
      selected_bases
      bases {
        id
      }
      review {
        id
        cip_type {
          id
        }
        trip
        cip
        readiness {
          id
        }
        reviewer {
          id
        }
      }
    }
  }
`;

export const PROCESS_PROJECT_MUTATION = gql`
  mutation processProject(
    $project_id: ID!
    $processing_status_id: ID!
    $remarks: String
  ) {
    processProject(
      project_id: $project_id
      processing_status_id: $processing_status_id
      remarks: $remarks
    ) {
      id
      project_processing_statuses {
        processing_status_id
        processing_status {
          id
        }
        processed_by
        processor {
          id
        }
        remarks
        processed_at
        created_at
        updated_at
      }
    }
  }
`;

export const TRANSFER_PROJECT_MUTATION = gql`
  mutation transferProject($project_id: ID!, $user_id: ID!) {
    transferProject(project_id: $project_id, user_id: $user_id) {
      project {
        id
        title
      }
      message
      status
    }
  }
`;

export const RETURN_PROJECT_MUTATION = gql`
  mutation returnProject($project_id: ID!, $remarks: String) {
    returnProject(project_id: $project_id, remarks: $remarks) {
      id
    }
  }
`;

export const VALIDATE_PROJECT_MUTATION = gql`
  mutation validateProject(
    $id: ID!
    $validation_data: Boolean
    $validation_signed: Boolean
    $remarks: String
  ) {
    validateProject(
      id: $id
      validation_data: $validation_data
      validation_signed: $validation_signed
      remarks: $remarks
    ) {
      id
      validation_data
      validation_signed
	    submission_status {
		    id
		    name
	    }
    }
  }
`;

export const CREATE_VERSION = gql`
  mutation createVersion(
    $change_log: String
    $change_type: String
    $notes: String
  ) {
    createVersion(
      change_log: $change_log
      change_type: $change_type
      notes: $notes
    ) {
      id
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

export const UPDATE_VERSION = gql`
  mutation updateVersion(
    $id: ID!
    $change_log: String
    $change_type: String
    $notes: String
  ) {
    updateVersion(
      id: $id
      change_log: $change_log
      change_type: $change_type
      notes: $notes
    ) {
      id
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

export const DELETE_VERSION = gql`
  mutation deleteVersion($id: ID!) {
    deleteVersion(id: $id) {
      id
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

export const UPLOAD_SIGNED_COPY = gql`
  mutation($id: ID!, $signed_copy: Upload, $remarks: String) {
    uploadSignedCopy(id: $id, signed_copy: $signed_copy, remarks: $remarks) {
      id
      signed_copy
      signed_copy_link
      submission_status {
        id
        name
      }
    }
  }
`;

export const SHARE_PROJECT = gql`
  mutation($project_id: ID!, $email: String!) {
    shareProject(input: { project_id: $project_id, email: $email }) {
      status
      message
    }
  }
`;

export const ACCEPT_PROJECT_MUTATION = gql`
  mutation($id: ID!, $remarks: String!) {
    acceptProject(id: $id, remarks: $remarks) {
      id
    }
  }
`;

export const APPROVE_PROJECT_MUTATION = gql`
  mutation($id: ID!, $remarks: String!) {
    approveProject(id: $id, remarks: $remarks) {
      id
    }
  }
`;

export const SAVE_REVIEW = gql`
  mutation(
    $id: ID!
    $typology_id: ID
    $cip: Boolean
    $cip_type_id: ID
    $trip: Boolean
    $within_period: Boolean
    $readiness_id: ID
    $remarks: String
    $ten_point_agenda: [ID]
    $sustainable_development_goals: [ID]
    $bases: [ID]
    $paradigms: [ID]
    $pdp_chapters: [ID]
    $pdp_indicators: [ID]
  ) {
    saveReview(
      input: {
        id: $id
        typology_id: $typology_id
        cip: $cip
        cip_type_id: $cip_type_id
        trip: $trip
        within_period: $within_period
        readiness_id: $readiness_id
        remarks: $remarks
        ten_point_agenda: $ten_point_agenda
        sustainable_development_goals: $sustainable_development_goals
        bases: $bases
        paradigms: $paradigms
        pdp_chapters: $pdp_chapters
        pdp_indicators: $pdp_indicators
      }
    ) {
      review {
        id
        project_id
        project {
          id
        }
        pip
        typology_id
        typology {
          id
        }
        cip
        cip_type_id
        cip_type {
          id
        }
        trip
        within_period
        readiness_id
        readiness {
          id
        }
        remarks
        created_at
        updated_at
        reviewed_by
        reviewer {
          id
        }
        sustainable_development_goals {
          id
        }
        ten_point_agenda {
          id
        }
        bases {
          id
        }
        paradigms {
          id
        }
        pdp_indicators {
          id
        }
        pdp_chapters {
          id
        }
        selected_pdp_chapters
        selected_pdp_indicators
        selected_sustainable_development_goals
        selected_bases
        selected_ten_point_agenda
        selected_paradigms
      }
      message
      status
    }
  }
`;

export const UPDATE_SETTING = gql`
  mutation($compact: Boolean, $dark: Boolean) {
    updateSetting(input: { compact: $compact, dark: $dark }) {
      id
      setting {
        dark
        compact
      }
    }
  }
`;

export const DELETE_ATTACHMENT = gql`
  mutation($id: ID!) {
    deleteAttachment(id: $id) {
      id
    }
  }
`;

export const UPLOAD_ATTACHMENT = gql`
  mutation($project_id: ID!, $attachment_type_id: ID!, $file: Upload!) {
    uploadAttachment(
      project_id: $project_id
      attachment_type_id: $attachment_type_id
      file: $file
    ) {
      id
      attachment_type {
        id
        name
      }
      dropbox_link
      file_size
    }
  }
`;

export const REQUEST_ACCOUNT = gql`
  mutation(
    $name: String!
    $email: String!
    $operating_unit: ID!
    $contact_number: String!
    $message: String
  ) {
    requestAccount(
      input: {
        name: $name
        email: $email
        operating_unit: $operating_unit
        contact_number: $contact_number
        message: $message
      }
    ) {
      message
      status
    }
  }
`;

export const VERIFY_EMAIL = gql`
  mutation($token: String!) {
    verifyEmail(input: { token: $token }) {
      access_token
      refresh_token
      user {
        id
        name
        email
      }
    }
  }
`;

export const SUBMIT_REVIEW_MUTATION = gql`
  mutation($id: ID!, $remarks: String!) {
    submitReview(id: $id, remarks: $remarks) {
      message
      status
      project {
        id
      }
    }
  }
`;

export const DELETE_PREXC_ACTIVITY = gql`
  mutation($id: ID!) {
    deletePrexcActivity(id: $id) {
      id
      name
    }
  }
`;

export const CREATE_PREXC_ACTIVITY = gql`
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
    createPrexcActivity(
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
      id
      name
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
      banner_program_id
      banner_program {
        id
        name
      }
      project_id
      uacs_code
      trip
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
    }
  }
`;

export const UPDATE_PREXC_ACTIVITY = gql`
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
      id
      name
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
      banner_program_id
      banner_program {
        id
        name
      }
      trip
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
    }
  }
`;

export const CREATE_FUNDING_SOURCE_FINANCIAL = gql`
  mutation(
    $project_id: ID!
    $funding_source_id: ID!
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
  ) {
    createFundingSourceFinancial(
      input: {
        project_id: $project_id
        funding_source_id: $funding_source_id
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
      }
    ) {
      id
      project_id
      funding_source_id
      funding_source {
        id
        name
      }
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
  }
`;
export const UPDATE_FUNDING_SOURCE_FINANCIAL = gql`
  mutation(
    $id: ID!
    $project_id: ID!
    $funding_source_id: ID!
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
    updateFundingSourceFinancial(
      input: {
        id: $id
        project_id: $project_id
        funding_source_id: $funding_source_id
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
      id
      project_id
      funding_source_id
      funding_source {
        id
        name
      }
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
    }
  }
`;

export const DELETE_FUNDING_SOURCE_FINANCIAL = gql`
  mutation($id: ID!) {
    deleteFundingSourceFinancial(id: $id) {
      id
      project_id
    }
  }
`;

export const CREATE_REGION_FINANCIAL = gql`
  mutation(
    $project_id: ID!
    $region_id: ID!
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
  ) {
    createRegionFinancial(
      input: {
        project_id: $project_id
        region_id: $region_id
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
      }
    ) {
      id
      project_id
      region_id
      region {
        id
        name
      }
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
  }
`;

export const UPDATE_REGION_FINANCIAL = gql`
  mutation(
    $id: ID!
    $project_id: ID!
    $region_id: ID!
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
  ) {
    updateRegionFinancial(
      input: {
        id: $id
        project_id: $project_id
        region_id: $region_id
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
      }
    ) {
      id
      project_id
      region_id
      region {
        id
        name
      }
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
  }
`;

export const DELETE_REGION_FINANCIAL = gql`
  mutation($id: ID!) {
    deleteRegionFinancial(id: $id) {
      id
      project_id
    }
  }
`;

export const CREATE_FUNDING_SOURCE_INFRASTRUCTURE = gql`
  mutation(
    $project_id: ID!
    $funding_source_id: ID!
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
  ) {
    createFundingSourceInfrastructure(
      input: {
        project_id: $project_id
        funding_source_id: $funding_source_id
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
      }
    ) {
      id
      project_id
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
  }
`;

export const UPDATE_FUNDING_SOURCE_INFRASTRUCTURE = gql`
  mutation(
    $id: ID!
    $project_id: ID!
    $funding_source_id: ID!
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
  ) {
    updateFundingSourceInfrastructure(
      input: {
        id: $id
        project_id: $project_id
        funding_source_id: $funding_source_id
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
      }
    ) {
      id
      project_id
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
  }
`;

export const DELETE_FUNDING_SOURCE_INFRASTRUCTURE = gql`
  mutation($id: ID!) {
    deleteFundingSourceInfrastructure(id: $id) {
      id
      project_id
    }
  }
`;

export const FINALIZE_PREXC_ACTIVITY = gql`
  mutation($id: ID!) {
    finalizePrexcActivity(id: $id) {
      id
      name
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

export const FINALIZE_PREXC_ACTIVITIES = gql`
  mutation($id: [ID]!) {
    finalizePrexcActivities(id: $id) {
      id
      name
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

export const REVIEW_PREXC_ACTIVITY = gql`
  mutation($id: ID!) {
    reviewPrexcActivity(id: $id) {
      ...prexcActivityFragment
    }
  }
  ${PREXC_ACTIVITY_FRAGMENT}
`;

export const EXPORT_EXCEL = gql`
  mutation ($operating_unit_id: ID) {
    exportExcel (operating_unit_id: $operating_unit_id) {
      link
    }
  }
`

export const UPDATE_OPERATING_UNIT_PREXC_ACTIVITIES = gql`
  mutation updateOperatingUnit(
    $id: ID!
    $prexc_activities: UpdatePrexcActivitiesHasMany
  ) {
    updateOperatingUnit(input: {
      id: $id
      prexc_activities: $prexc_activities
    }) {
      id
      prexc_activities {
        id
        name
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
  }
`
