<template>
  <q-page class="flex flex-center" style="position: relative;">
    <div class="column q-gutter-y-xl" v-if="success">
      <div class="text-h3 text-center">
        You have successfully verified your email.
      </div>

      <div class="row justify-center">
        <q-btn size="lg" color="primary" label="Login" to="/login"></q-btn>
      </div>
    </div>
    <div v-else>
      <div class="text-h3 text-center">Something went wrong.</div>
    </div>

    <q-inner-loading :showing="loading">
      <q-spinner-tail size="50px" color="primary"></q-spinner-tail>
    </q-inner-loading>
  </q-page>
</template>

<script>
import { showError } from '@/utils';

export default {
  name: 'EmailVerify',
  data() {
    return {
      loading: true,
      success: false
    };
  },
  created() {
    this.loading = true;

    const TOKEN = this.$route.query.token ? this.$route.query.token : null;

    if (!TOKEN) {
      this.loading = false;
      this.success = false;
      alert('Unable to retrieve token. Please check the email again.');
    } else {
      this.$store
        .dispatch('auth/verifyEmail', { token: TOKEN })
        .then(res => {
          if (res.verifyEmail) {
            this.success = true;
          }
        })
        .catch(showError)
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>
