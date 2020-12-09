<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import {LocalStorage} from "quasar";

export default {
  name: 'App',
  created() {
    /**
     * Check if token is defined
     * If yes, check if the token is still valid
     */
    const token = LocalStorage.getItem('token')
    if (token) {
      this.$store.dispatch('auth/onAuthStateChanged')
    }
  }
};
</script>

<style>
#q-app {
  min-width: 380px;
}
</style>
