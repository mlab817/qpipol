<template>
  <page-container>
    <template v-slot:title>
      <page-title title="Settings" icon="fas fa-cog"></page-title>
    </template>

    <div class="row q-pa-sm">
      <div class="col-lg-4 col-md-6 col-xs-12">
        <span class="text-subtitle1">Reset App</span>
        <p class="text-caption">
          Reset the application if you are encountering problems.
        </p>
      </div>

      <div class="col-lg-8 col-md-6 col-xs-12 q-pl-md">
        <q-btn outline label="RESET" @click="confirmReset"></q-btn>
      </div>
    </div>
  </page-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import PageContainer from '@/ui/page/PageContainer';
import PageTitle from '@/ui/page/PageTitle';

export default {
  name: 'PageSettings',

  components: { PageTitle, PageContainer },

  computed: {
    ...mapState('settings', ['dark', 'dense'])
  },

  data() {
    return {
      compact: true,
      shortcuts: [],
      changeLogDialog: false
    };
  },

  methods: {
    ...mapActions('settings', ['setDark', 'setDense']),
    toggleDark(e) {
      this.setDark(e);
    },
    confirmReset() {
      this.$q
        .dialog({
          title: 'Reset Application',
          message:
            'Are you sure you want to reset the app? This will log you out from application.',
          cancel: true
        })
        .onOk(() => {
          localStorage.clear();
          window.location.reload();
          this.$router.push('/login');
        });
    }
  }
};
</script>

<style scoped>
button.q-btn {
  width: 150px;
}
</style>
