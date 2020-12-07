<template>
  <page-container>
    <template v-slot:title>
      <page-title title="Settings" icon="fas fa-cog"></page-title>
    </template>

    <div class="row q-pa-sm">
      <div class="col-lg-4 col-md-6 col-xs-12">
        <span class="text-subtitle1">Discord</span>
        <p class="text-caption">
          Link your Discord account to get real-time notifications.
        </p>
      </div>

      <div class="col-lg-8 col-md-6 col-xs-12 q-pl-md">
        <q-btn
          :disable="discord"
          color="grey-8"
          icon="fab fa-discord"
          :label="discord ? 'CONNECTED' : 'CONNECT'"
          @click="confirmDiscord"></q-btn>
      </div>
    </div>

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
import {
  PageContainer,
  PageTitle
} from 'src/ui';
import { openURL } from "quasar";

export default {
  name: 'PageSettings',

  components: { PageTitle, PageContainer },

  computed: {
    ...mapState('settings', ['dark', 'dense']),
    discord() {
      return !!this.$store.state.auth.me.discord_user_id
    }
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
    },
    confirmDiscord() {
      openURL('http://ipmsv2.test/auth/discord', null, {
        target: '_blank'
      })
    }
  }
};
</script>
