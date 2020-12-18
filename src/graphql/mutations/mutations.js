import gql from 'graphql-tag';
import {ACTIVITY_FRAGMENT, BASIC_INFORMATION_FRAGMENT, PROJECT_FRAGMENT} from 'src/graphql'
import { PREXC_ACTIVITY_FRAGMENT } from '../fragments';

/* Auth */

export const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(input: { username: $username, password: $password }) {
      access_token
      refresh_token
      expires_in
      user {
        id
        name
        email
        verified
        avatar
        roles {
          id
          name
        }
        permissions {
          id
          name
        }
        profile {
          id
          nickname
          operating_unit {
            id
            name
          }
        }
        discord_user_id
        discord_private_channel_id
      }
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

export const REVOKE_ALL_TOKENS = gql`
  mutation revokeAllTokens {
    revokeAllTokens
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
    $operating_unit_id: ID
    $position: String
    $contact_number: String
  ) {
    updateUser(
      input: {
        name: $name
        operating_unit_id: $operating_unit_id
        position: $position
        contact_number: $contact_number
      }
    ) {
      id
      name
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

export const RESTORE_PROJECT_MUTATION = gql`
  mutation restoreProject($id: ID!) {
    restoreProject(id: $id) {
      ...basicInformation
    }
  }
  ${BASIC_INFORMATION_FRAGMENT}
`;

export const DELETE_PROJECT_MUTATION = gql`
  mutation deleteProject($id: ID!) {
    deleteProject(id: $id) {
      id
      title
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
  ) {
    validateProject(
      id: $id
    ) {
      id
	    submission_status {
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
  mutation (
    $email: String!
    $url: String!
  ) {
    shareProject(
      email: $email,
      url: $url
    ) {
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

export const EXPORT_EXCEL = gql`
  mutation ($operating_unit_id: ID) {
    exportExcel (operating_unit_id: $operating_unit_id) {
      link
    }
  }
`

export const EXPORT_PROJECT_DOCX_MUTATION = gql`
  mutation ($id: ID!) {
    exportProjectDocx(id: $id) {
      link
    }
  }
`

// new in v1.1.0
export const EXPORT_FOR_CONSOLIDATION = gql`
  mutation {
    exportForConsolidation {
      link
    }
  }
`

export const EXPORT_PROJECTS = gql`
	mutation {
		exportProjects {
			link
		}
	}
`

export const CREATE_ACTIVITY_FROM_PROJECT = gql`
	mutation ($id: ID!) {
		createPrexcActivityFromProject(id: $id) {
      ...activityFragment
		}
	}
  ${ACTIVITY_FRAGMENT}
`

export const SYNC_ACTIVITY_TO_PROJECT = gql`
  mutation ($id: ID!) {
    syncActivityToProject (id: $id) {
      ...activityFragment
    }
  }
  ${ACTIVITY_FRAGMENT}
`

export const UPDATE_PIPOL_STATUS = gql`
	mutation (
		$id: ID!
		$pipol_status_id: ID!
	) {
		updatePipolStatus (
			id: $id
			pipol_status_id: $pipol_status_id
		) {
			id
			pipol_code
			pipol_status_id
			pipol_status {
				id
				name
			}
		}
	}
`
