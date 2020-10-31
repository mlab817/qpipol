<template>
  <page-container>
    <template v-slot:title>
      <page-title title="Dashboard" icon="dashboard"></page-title>
    </template>

    <div class="row q-pa-md q-gutter-y-md q-col-gutter-md">
      <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-sm-12">
        <short-cuts></short-cuts>

        <!-- <processing-statuses></processing-statuses> -->
      </div>

      <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
        <!-- Shortcuts -->
        <activity-component></activity-component>
      </div>
    </div>
  </page-container>
</template>

<script>
import PageTitle from '@/ui/page/PageTitle';
import PageContainer from '@/ui/page/PageContainer';
import ActivityComponent from '../components/dashboard/ActivityComponent';
import ShortCuts from '../components/dashboard/ShortCuts.vue';
// import ProcessingStatuses from '../components/dashboard/ProcessingStatuses';

export default {
  name: 'PageIndex',

  components: {
    ActivityComponent,
    PageContainer,
    PageTitle,

    ShortCuts
    // ProcessingStatuses
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
