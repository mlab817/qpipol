<template>
  <div class="row q-pa-sm q-col-gutter-lg">
    <div class="col-lg-4 col-md-6 col-xs-12">
      <span class="text-subtitle1 text-primary">Logout All Devices</span>
      <div class="text-caption">
        This app does not log out automatically. If you have not logged out
        previously logged in devices, chances are they are still logged in. You
        may log them out by clicking this button. Note: This device will also be
        logged out.
      </div>
    </div>

    <div class="col-lg-8 col-md-6 col-xs-12">
      <q-btn
        label="Logout"
        @click="confirmRevokeAllTokens"
        color="negative"
        outline
      ></q-btn>
    </div>
  </div>
</template>

<script>
import { client } from 'boot/apollo';
import gql from 'graphql-tag';
import { Loading, LocalStorage } from 'quasar';

export default {
  name: 'RevokeTokens',
  methods: {
    confirmRevokeAllTokens() {
      this.$q
        .dialog({
          title: 'Confirm',
          message: 'Are you sure you want to log out all devices?',
          cancel: true,
          transitionShow: 'fadeIn',
          transitionHide: 'fadeOut'
        })
        .onOk(() => this.revokeAllTokens());
    },
    revokeAllTokens() {
      Loading.show();
      client
        .mutate({
          mutation: gql`
            mutation revokeAllTokens {
              revokeAllTokens
            }
          `,
          variables: {}
        })
        .then(() => {
          LocalStorage.clear();
        })
        .then(() => {
          this.$router.replace('/login');
        })
        .finally(() => Loading.hide());
    }
  }
};
</script>

<style scoped>
button.q-btn {
  width: 150px;
}
</style>
