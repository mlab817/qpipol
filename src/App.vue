<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { LocalStorage } from 'quasar';

export default {
  name: 'App',

  computed: {
    ...mapState('settings', ['dark'])
  },

  created() {
    const token = LocalStorage.getItem('token');
    if (token && (token !== null || token !== '')) {
      this.$store.dispatch('auth/getCurrentUser');
    }
    this.$q.dark.set(this.dark);
  }
};
</script>
