<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { LocalStorage } from 'quasar';

export default {
  name: 'App',

  created() {
    const token = LocalStorage.getItem('token');
    if (token && (token !== null || token !== '')) {
      this.$store.dispatch('auth/getCurrentUser');
    }
    this.$q.dark.set(this.dark);
  }
};
</script>
