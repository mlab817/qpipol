<template>
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
                v-if="!isLoggedIn"
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
              :to="isLoggedIn ? '/dashboard' : '/login'"
            >
              Start Using IPMS
            </q-btn>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'PageLanding',
  computed: {
    ...mapGetters('auth', ['isLoggedIn'])
  },
  data() {
    return {
      appName: process.env.APP_NAME,
      appShortname: process.env.APP_SHORTNAME
    }
  }
};
</script>

<style scoped>
.full-page {
  height: calc(100vh - 102px);
}
</style>
