<template>
  <q-layout>
    <q-header>
      <div class="row q-pa-sm items-center justify-between">
        <div
          class="offset-xl-2 col-xl-8 offset-lg-3 col-lg-6 offset-md-1 col-md-10 offset-sm-1 col-sm-10 offset-xs-0 col-xs-12"
        >
          <div class="row q-gutter-sm items-center">
            <img src="~assets/app-logo-128x128.png" style="height: 40px;" />

            <div>
              <span class="gt-md">{{appName}}</span>
              <span class="lt-lg">{{appShortname}}</span>
            </div>

            <q-space />

            <q-btn
              type="a"
              flat
              stretch
              href="https://ipms-docs.web.app/getting-started"
              target="_blank"
            >Get Started</q-btn
            >

            <q-separator vertical color="white"></q-separator>

            <q-btn
              flat
              label="Go to App"
              stretch
              to="/dashboard"
              v-if="loggedIn"
            ></q-btn>

            <q-btn
              label="Login"
              stretch
              to="/login"
              color="primary"
              v-else
            ></q-btn>
          </div>
        </div>
      </div>
    </q-header>

    <q-page-container>
      <q-page>
        <div class="column">
          <div class="row items-center full-page">
            <div
              class="offset-xl-2 col-xl-8 offset-lg-3 col-lg-6 offset-md-1 col-md-10 offset-sm-1 col-sm-10 offset-xs-0 col-xs-12"
            >
              <div
                class="col-6 q-gutter-y-lg text-white text-center justify-center"
              >
                <div class="text-h3 text-weight-bold">
                  <span class="gt-md">{{appName}}</span>
                  <span class="lt-lg">{{appShortname}}</span>
                </div>

                <div class="row">
                  <div class="offset-4 col-4">
                    <q-separator color="secondary" />
                  </div>
                </div>

                <div class="text-h5">
                  The Official Data Entry System for the DA 2017-2022 Public
                  Investment Program (PIP) and the DA 2022-2024 Three Year Rolling
                  Infrastructure Program (TRIP)
                </div>

                <div class="row justify-center q-gutter-md">
                  <q-btn
                    size="lg"
                    class="text-capitalize text-weight-bolder"
                    color="primary"
                    style="width: 220px;"
                    to="/login"
                    v-if="!loggedIn"
                  >
                    Login
                  </q-btn>

                  <q-btn
                    size="lg"
                    class="text-capitalize text-weight-bolder"
                    outline
                    style="width: 220px;"
                    type="a"
                    href="https://ipms-docs.web.app/"
                    target="_blank"
                  >
                    Learn More
                  </q-btn>
                </div>
              </div>
            </div>
          </div>
          <div class="row bg-black text-white items-center q-py-xl">
            <div
              class="offset-xl-2 col-xl-8 offset-lg-3 col-lg-6 offset-md-1 col-md-10 offset-sm-1 col-sm-10 offset-xs-0 col-xs-12"
            >
              <div class="text-center q-gutter-y-lg">
                <div class="text-h4 text-weight-bold">
                  Manage your programs and projects.
                </div>

                <div class="row">
                  <div class="offset-4 col-4">
                    <q-separator color="secondary" />
                  </div>
                </div>

                <q-btn
                  size="lg"
                  class="text-capitalize text-weight-bolder"
                  outline
                  color="primary"
                  style="width: 220px;"
                  :to="loggedIn ? '/dashboard' : '/login'"
                >
                  Start Using IPMS
                </q-btn>
              </div>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import {LocalStorage} from "quasar";

export default {
  name: 'PageLanding',
  data() {
    return {
      appName: process.env.APP_NAME,
      appShortname: process.env.APP_SHORTNAME,
      loggedIn: LocalStorage.getItem('loggedIn')
    }
  },
  mounted() {
    console.log(this.loggedIn)
  }
};
</script>

<style scoped>
.full-page {
  height: calc(100vh - 102px);
}
</style>
