<template>
  <q-toolbar>
    <q-avatar>
      <q-img
        src="~assets/app-logo-128x128.png"
        @click="$router.push({ name: 'home' })"
        class="cursor-pointer"
      />
    </q-avatar>

    <q-toolbar-title class="text-white">
      <span class="gt-md">{{ appName }}</span>
      <span class="lt-md">{{ appShortname }}</span>
      ({{ env }})
    </q-toolbar-title>
    <q-space />

    <!-- <q-btn flat round icon="search" class="q-mr-sm" v-else></q-btn> -->

    <notification-button></notification-button>

    <q-btn flat round>
      <div>
        <user-avatar :src="user ? user.user_avatar : ''"></user-avatar>

        <dropdown-menu :user="user" />
      </div>
    </q-btn>
  </q-toolbar>
</template>

<script>
import DropdownMenu from './Dropdown';
import UserAvatar from './UserAvatar';
import NotificationButton from './NotificationButton';

export default {
  components: {
    DropdownMenu,
    NotificationButton,
    UserAvatar
  },
  name: 'AppHeader',
  props: ['user'],
  computed: {
    isEncoder() {
      return this.$store.getters['auth/isEncoder'];
    }
  },
  data() {
    return {
      env: process.env.APP_ENV,
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
