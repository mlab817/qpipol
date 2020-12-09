<template>
  <q-toolbar style="height: 72px;">
    <q-avatar>
      <img
        height="32"
        src="src/statics/app-logo-128x128.svg"
        @click="$router.push({ name: 'home' })"
        class="cursor-pointer gt-md"
        alt="ipms"
      >
    </q-avatar>

    <q-input
      v-model="search"
      placeholder="Search for projects"
      rounded
      outlined
      dense
      style="width: 100%; max-width: 380px;"
      debounce="500"
    >
      <template v-slot:prepend>
        <q-icon name="search" />
      </template>
    </q-input>

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
    search: {
      get() {
        return this.$store.state.projects.search
      },
      set(val) {
        this.$store.dispatch('projects/setSearch', val)
      }
    },
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
