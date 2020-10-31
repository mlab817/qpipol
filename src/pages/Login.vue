<template>
  <q-page padding>
    <div class="full-width column justify-center">
      <div class="row justify-center q-my-lg">
        <div class="column text-center">
          <div>
            <q-img src="statics/app-logo-128x128.png" width="128px" />
          </div>
        </div>
      </div>

      <div class="row justify-center">
        <q-card bordered flat class="my-card bg-info" dark square>
          <div class="row q-pa-md text-weight-light text-h6">
            Login to your IPMS Account
          </div>

          <q-separator color="white" spaced />

          <q-card-section class="q-pa-md">
            <login-form></login-form>
          </q-card-section>
          <q-card-section class="q-gutter-md">
            <div class="text-center">
              <span
                class="text-blue text-weight-lighter cursor-pointer"
                @click="showForgotPasswordDialog"
              >
                Forgot password
              </span>
            </div>
            <div class="text-center">
              Don't have an account?
              <span
                class="text-blue text-wight-bolder cursor-pointer"
                @click="requestAccountDialog = true"
                >Request one</span
              >
            </div>
          </q-card-section>
        </q-card>
      </div>

      <q-dialog
        v-model="requestAccountDialog"
        transition-show="jump-down"
        transition-hide="jump-up"
        :maximized="$q.screen.lt.sm"
      >
        <request-account
          @close="requestAccountDialog = false"
        ></request-account>
      </q-dialog>

      <div class="row justify-center q-my-xl">
        &copy; 2020 Investment Programming Division
      </div>
    </div>
  </q-page>
</template>

<script>
import LoginForm from '../components/auth/LoginForm';

import RequestAccount from '../components/auth/RequestAccount';
import { validateEmail, showError } from '@/utils';

import {
  showErrorNotification,
  showSuccessNotification
} from '@/functions/function-show-notifications';

export default {
  name: 'PageLogin',
  components: {
    LoginForm,
    RequestAccount
  },

  data() {
    return {
      appTitle: process.env.APP_NAME,
      requestAccountDialog: false
    };
  },
  methods: {
    showForgotPasswordDialog() {
      this.$q
        .dialog({
          title: 'Forgot Password',
          message: 'Enter your email below.',
          prompt: {
            model: '',
            type: 'text',
            isValid: val => validateEmail(val)
          },
          cancel: true,
          persistent: true
        })
        .onOk(email => {
          this.$q.loading.show({
            message: 'Sending password reset link'
          });
          this.$store
            .dispatch('auth/forgotPassword', email)
            .then(res => {
              const { status, message } = res.forgotPassword;
              if (status === 'EMAIL_NOT_SENT') {
                showErrorNotification({
                  message: message
                });
              } else {
                showSuccessNotification({
                  message: message
                });
              }
            })
            .catch(showError)
            .finally(() => this.$q.loading.hide());
        });
    }
  }
};
</script>

<style>
.my-card {
  width: 100%;
  max-width: 400px;
}
</style>
