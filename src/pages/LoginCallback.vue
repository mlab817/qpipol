<template>
  <q-layout>
    <q-page-container>
      <q-page padding>
        <div>Retrieving user information...</div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import {LocalStorage} from "quasar";

export default {
  name: 'LoginCallback',
  mounted() {
    const access_token = this.$route.query.access_token
    if (access_token) {
      LocalStorage.set('token', access_token)
      this.$store.dispatch('auth/onAuthStateChanged')
    }
  }
}
</script>
