<template>
  <q-layout view="hHh lpR fFf" class="bg-info">
    <q-header class="bg-info text-white">
      <div class="row q-pa-sm items-center justify-between">
        <div
          class="offset-xl-2 col-xl-8 offset-lg-3 col-lg-6 offset-md-1 col-md-10 offset-sm-1 col-sm-10 offset-xs-0 col-xs-12"
        >
          <div class="row q-gutter-sm items-center">
            <img src="~assets/app-logo-128x128.png" style="height: 40px;" />

            <div class="gt-xs">
              Investment Programming &amp; Management System
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
              v-if="isLoggedIn"
            ></q-btn>

            <q-btn
              label="Login"
              stretch
              to="/login"
              color="primary"
              v-if="!isLoggedIn"
            ></q-btn>
          </div>
        </div>
      </div>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="bg-dark text-white">
      <q-separator />
      <app-footer></app-footer>
    </q-footer>
  </q-layout>
</template>

<script>
import { mapGetters } from 'vuex';
import AppFooter from '@/ui/components/Footer';

export default {
  components: { AppFooter },
  name: 'LandingLayout',
  computed: {
    ...mapGetters('auth', ['isLoggedIn'])
  }
};
</script>
