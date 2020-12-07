<template>
  <q-toolbar style="height: 84px;" class="text-grey-8">
    <q-avatar>
      <q-img
        src="~assets/app-logo-128x128.png"
        @click="$router.push({ name: 'home' })"
        class="cursor-pointer"
      />
    </q-avatar>

    <q-toolbar-title class="text-red-5">
      <span class="gt-md">{{ appName }}</span>
      <span class="lt-md">{{ appShortname }}</span>
    </q-toolbar-title>
    <q-space />

    <q-btn color="red-5" flat label="Dashboard"></q-btn>
    <q-btn color="red-5" flat label="Projects"></q-btn>
    <q-btn color="red-5" flat label="Settings"></q-btn>
    <q-btn-dropdown color="red-5" flat label="More"></q-btn-dropdown>
  </q-toolbar>
</template>

<script>
export default {
  name: 'AppHeader',
  props: ['user'],
  computed: {
    isEncoder() {
      return this.$store.getters['auth/isEncoder'];
    }
  },
  data() {
    return {
      menu: false,
      notificationsDropdown: false,
      markingAllAsRead: false,
      showSearch: false,
      appName: process.env.APP_NAME,
      appShortname: process.env.APP_SHORTNAME
    };
  }
};
</script>
