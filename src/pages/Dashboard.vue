<template>
  <page-container>
    <template v-slot:title>
      <page-title title="Dashboard" icon="fas fa-tachometer-alt"></page-title>
    </template>

    <q-banner class="bg-red-1" v-if="env === 'STAGING'">
      This is the staging version of the System. For the live production version, please click the link below.
      <template v-slot:action>
        <q-btn flat color="negative" label="GO" @click="openURL('https://da-ipms2020.web.app')" />
      </template>
    </q-banner>

    <projects-summary />

    <div class="row q-pa-md q-gutter-y-md q-col-gutter-md">
      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-sm-12">
        <short-cuts></short-cuts>
      </div>

      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
				<announcement-component />

				<releases-component />

				<useful-links></useful-links>
      </div>
    </div>
  </page-container>
</template>

<script>
import { PageTitle, PageContainer } from '@/ui'
import ShortCuts from '../components/dashboard/ShortCuts.vue';
import ReleasesComponent from '../components/dashboard/Releases'
import UsefulLinks from '../components/dashboard/UsefulLinks'
import { openURL } from 'quasar'
import AnnouncementComponent from '../components/dashboard/AnnouncementComponent'

import ProjectsSummary from 'src/components/charts/ProjectsSummary'

export default {
  name: 'PageIndex',

  components: {
	  AnnouncementComponent,
	  UsefulLinks,
	  ReleasesComponent,
    PageContainer,
    PageTitle,
    ShortCuts,
    ProjectsSummary
  },

  computed: {
    user() {
      return this.$store.state.auth.user;
    },

    isEncoder() {
      return this.$store.getters['auth/isEncoder'];
    }
  },

  data() {
    return {
      env: process.env.APP_ENV,
    }
  },

  methods: {
    openURL
  }
};
</script>
