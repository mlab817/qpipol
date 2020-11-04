<template>
  <page-container>
    <template v-slot:title>
      <page-title title="Dashboard" icon="dashboard"></page-title>
    </template>

    <div class="row q-pa-md q-gutter-y-md q-col-gutter-md">
      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-sm-12">
        <short-cuts></short-cuts>

				<activity-component></activity-component>
      </div>

      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
				<releases-component />

				<useful-links></useful-links>
      </div>
    </div>
  </page-container>
</template>

<script>
import { PageTitle, PageContainer } from '@/ui'
import ActivityComponent from '../components/dashboard/ActivityComponent';
import ShortCuts from '../components/dashboard/ShortCuts.vue';
import ReleasesComponent from '../components/dashboard/Releases'
import UsefulLinks from '../components/dashboard/UsefulLinks'

export default {
  name: 'PageIndex',

  components: {
	  UsefulLinks,
	  ReleasesComponent,
    ActivityComponent,
    PageContainer,
    PageTitle,

    ShortCuts
  },

  computed: {
    user() {
      return this.$store.state.auth.user;
    },

    isEncoder() {
      return this.$store.getters['auth/isEncoder'];
    }
  }
};
</script>
