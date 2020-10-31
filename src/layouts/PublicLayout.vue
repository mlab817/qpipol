<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-info text-white">
      <div class="row q-pa-sm">
        <img src="statics/app-logo-128x128.png" style="height: 40px;" />

        <div class="gt-xs">
          Investment Programming &amp; Management System
        </div>

        <q-space />

        <q-btn type="a" flat stretch to="/login">Get Started</q-btn>
      </div>
      <q-separator color="secondary" />
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'PublicLayout'
};
</script>
