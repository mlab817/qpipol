<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card v-bind:style="$q.screen.lt.sm?{'width': '80%'}:{'width':'380px'}">
          <q-card-section>
            <q-avatar size="103px" class="absolute-center shadow-10">
              <img src="../statics/profile.svg">
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">
                Log in
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form
              ref="loginForm"
              class="q-gutter-md"
              @submit="handleSubmit"
            >
              <div>
                <q-btn push icon="fab fa-google" label="Continue with Google" type="button" text-color="red-5" color="white" class="full-width" size="lg" no-caps />
              </div>

              <q-input
                outlined
                v-model="username"
                label="Username"
                lazy-rules
                :rules="[ val => !!val || '* Required' ]"
              >
                <template v-slot:prepend>
                  <q-icon name="fas fa-envelope" />
                </template>
              </q-input>

              <q-input
                type="password"
                outlined
                v-model="password"
                label="Password"
                lazy-rules
                :rules="[ val => !!val || '* Required' ]"
              >
                <template v-slot:prepend>
                  <q-icon name="fas fa-lock" />
                </template>
              </q-input>

              <div>
                <q-btn type="submit" label="Log in" color="primary" class="full-width" size="lg" no-caps />
              </div>

              <div class="row justify-center text-primary">
                or <span @click="showForgotPasswordDialog" class="cursor-pointer text-blue-5"> &nbsp;Forgot Password</span>
              </div>
            </q-form>
          </q-card-section>
        </q-card>

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
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { validateEmail, showError } from 'src/utils';

import {
  showErrorNotification,
  showSuccessNotification
} from 'src/functions/function-show-notifications';
import {authService} from "src/services";
import {LocalStorage} from "quasar";

export default {
  name: 'PageLogin',
  data() {
    return {
      appTitle: process.env.APP_NAME,
      requestAccountDialog: false,
      username: '',
      password: ''
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
    },
    handleSubmit() {
      this.$refs.loginForm.validate().then(success => {
        if (success) {
          // TODO: implement Login
          authService.login({
            username: this.username,
            password: this.password
          }).then(res => {
            console.log(res)
            const {
              access_token,
              user
            } = res.login
            LocalStorage.set('token', access_token)
            LocalStorage.set('user', user)
            LocalStorage.set('loggedIn', true)
            this.$router.replace('/')
          })
          .catch(err => {
            showErrorNotification(err.message)
            LocalStorage.remove('token')
            LocalStorage.remove('user')
            LocalStorage.remove('loggedIn')
          })
        }
      })
    }
  }
};
</script>


