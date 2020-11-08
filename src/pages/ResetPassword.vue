<template>
  <q-page padding>
    <div class="full-width column justify-center">
      <div class="row justify-center q-my-lg">
        <div class="column text-center">
          <div>
            <q-img src="~assets/app-logo-128x128.png" width="128px" />
          </div>
        </div>
      </div>

      <div class="row justify-center">
        <q-card bordered flat class="my-card bg-info" dark square>
          <div class="row q-pa-md text-weight-light text-h6">
            Reset Password
          </div>

          <q-separator color="white" spaced />

          <q-card-section class="q-pa-md">
            <q-form
              ref="passwordReset"
              class="q-gutter-md"
              @submit="updateForgottenPassword"
            >
              <q-input
                stack-label
                outlined
                v-model="email"
                readonly
                dark
                label="Email (email@example.com)"
                :rules="required"
                hide-bottom-space
              ></q-input>
              <q-input
                stack-label
                outlined
                type="password"
                v-model="password"
                dark
                label="Password"
                :rules="required"
                hide-bottom-space
              ></q-input>
              <q-input
                stack-label
                outlined
                type="password"
                v-model="password_confirmation"
                dark
                label="Confirm Password"
                :rules="required"
                hide-bottom-space
              ></q-input>
              <div class="text-center">
                <q-btn
                  class="full-width"
                  type="submit"
                  label="Reset Password"
                  color="primary"
                ></q-btn>
              </div>
            </q-form>
          </q-card-section>
          <q-card-section class="q-gutter-md">
            <div class="text-center">
              Remembered your password?
              <span
                class="text-blue text-wight-bolder cursor-pointer"
                @click="goToLogin"
                >Login instead</span
              >
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="row justify-center q-my-xl">
        &copy; 2020 Investment Programming Division
      </div>
    </div>
  </q-page>
</template>

<script>
import { showError } from '@/utils';

export default {
  name: 'ResetPassword',
  data() {
    return {
      email: '',
      password: '',
      password_confirmation: '',
      token: '',
      required: [val => !!val || '* Required']
    };
  },
  methods: {
    goToLogin() {
      this.$router.replace({ name: 'login' });
    },
    updateForgottenPassword() {
      this.$refs.passwordReset.validate().then(success => {
        if (success) {
          const payload = {
            email: this.email,
            password: this.password,
            password_confirmation: this.password_confirmation,
            token: this.token
          };

          this.$q.loading.show();

          this.$store
            .dispatch('auth/updateForgottenPassword', payload)
            .then(res => {
              const { status, message } = res.updateForgottenPassword;
              if (status === 'PASSWORD_UPDATED') {
                this.$q.notify({
                  type: 'positive',
                  message: 'Password updated!'
                });
                this.$q
                  .dialog({
                    title: 'Password Updated',
                    message: 'You may now login using your new password.',
                    persistent: true,
                    transitionShow: 'jump-down',
                    transitionHide: 'jump-up'
                  })
                  .onDismiss(() => this.$router.replace('/login'));
              } else {
                this.$q.notify({
                  type: 'negative',
                  message: message
                });
              }
            })
            .catch(showError)
            .finally(() => this.$q.loading.hide());
        } else {
          alert('Please check form inputs.');
        }
      });
    }
  },
  created() {
    // reset-password?token={token}&email={email}
    // /password/reset/:token?email=email
    const email = this.$route.query.email;
    if (typeof email == 'undefined') {
      alert('Email is required.');
    } else {
      this.email = this.$route.query.email;
      this.token = this.$route.params.token;
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
