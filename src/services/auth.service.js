import { client } from '@/boot/apollo';
import { handleResponse, handleError } from '@/utils';

import {
  REGISTER_MUTATION,
  LOGIN_MUTATION,
  LOGOUT_MUTATION,
  UPDATE_PASSWORD_MUTATION,
  RESEND_EMAIL_VERIFICATION_MUTATION,
  VERIFY_EMAIL_MUTATION,
  FORGOT_PASSWORD_MUTATION,
  UPDATE_FORGOTTEN_PASSWORD,
  UPDATE_SETTING,
  REQUEST_ACCOUNT,
  CHECK_EMAIL_AVAILABILITY_QUERY
} from 'src/graphql';

export const authService = {
  register({ name, email, password, password_confirmation }) {
    return client
      .mutate({
        mutation: REGISTER_MUTATION,
        variables: {
          name: name,
          email: email,
          password: password,
          password_confirmation: password_confirmation
        }
      })
      .then(handleResponse)
      .catch(handleError);
  },

  login({ username, password }) {
    return client
      .mutate({
        mutation: LOGIN_MUTATION,
        variables: {
          username: username,
          password: password
        }
      })
      .then(handleResponse)
      .catch(handleError);
  },

  logout() {
    return client
      .mutate({
        mutation: LOGOUT_MUTATION,
        variables: {}
      })
      .then(handleResponse)
      .catch(handleError);
  },

  updatePassword({ old_password, password, password_confirmation }) {
    return client
      .mutate({
        mutation: UPDATE_PASSWORD_MUTATION,
        variables: {
          old_password: old_password,
          password: password,
          password_confirmation: password_confirmation
        }
      })
      .then(handleResponse)
      .catch(handleError);
  },

  forgotPassword({ email }) {
    return client
      .mutate({
        mutation: FORGOT_PASSWORD_MUTATION,
        variables: {
          email: email
        }
      })
      .then(handleResponse)
      .catch(handleError);
  },

  resendEmailVerification({ email }) {
    return client
      .mutate({
        mutation: RESEND_EMAIL_VERIFICATION_MUTATION,
        variables: {
          email: email
        }
      })
      .then(handleResponse)
      .catch(handleError);
  },

  verifyEmail({ token }) {
    return client
      .mutate({
        mutation: VERIFY_EMAIL_MUTATION,
        variables: {
          token: token
        }
      })
      .then(handleResponse)
      .catch(handleError);
  },

  checkEmailAvailability({ email }) {
    return client
      .query({
        query: CHECK_EMAIL_AVAILABILITY_QUERY,
        variables: {
          email: email
        }
      })
      .then(handleResponse)
      .catch(handleError);
  },

  updateForgottenPassword(payload) {
    return client
      .mutate({
        mutation: UPDATE_FORGOTTEN_PASSWORD,
        variables: payload
      })
      .then(handleResponse)
      .catch(handleError);
  },

  updateSetting(payload) {
    return client
      .mutate({
        mutation: UPDATE_SETTING,
        variables: payload
      })
      .then(handleResponse)
      .catch(handleError);
  },

  requestAccount(payload) {
    return client
      .mutate({
        mutation: REQUEST_ACCOUNT,
        variables: payload
      })
      .then(handleResponse)
      .catch(handleError);
  }
};
