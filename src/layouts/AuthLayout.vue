<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container class="bg-info text-white">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      tab: 'login'
    };
  }
};
</script>
