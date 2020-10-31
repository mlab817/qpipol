<template>
  <div class="row q-pa-sm q-col-gutter-lg">
    <div class="col-lg-4 col-md-6 col-xs-12">
      <span class="text-subtitle1 text-primary">Verify Email</span>
      <div class="text-caption">
        Verify your email to secure your account. Your email will also be used
        to retrieve your password. Also, your email will be used to receive
        important updates from the System.
      </div>
    </div>

    <div class="col-lg-8 col-md-6 col-xs-12">
      <q-btn
        label="Resend Email"
        @click="verifyEmail"
        color="primary"
        v-if="!isVerified"
      ></q-btn>
      <span v-else>VERIFIED</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
  name: 'VerifyEmail',

  computed: {
    ...mapState('auth', ['user']),
    ...mapGetters('auth', ['isVerified'])
  },

  methods: {
    verifyEmail() {
      this.resendingEmail = true;

      const payload = {
        email: this.user.email
      };

      this.$q.loading.show('Resending email...');

      this.$store
        .dispatch('security/resendEmailVerification', payload)
        .then(() =>
          this.$q.notify({
            type: 'positive',
            message: 'Please check your email',
            position: 'bottom-right'
          })
        )
        .catch(err => {
          this.$q.notify({
            type: 'negative',
            message: err.message,
            position: 'bottom-right'
          });
        })
        .finally(() => this.$q.loading.hide());
    }
  }
};
</script>
