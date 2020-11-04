<template>
  <q-menu square max-width="300px" :offset="[0, 15]">
    <user-info :user="user"></user-info>

    <q-separator />

    <app-menu style="min-width: 280px; margin-top: 200px;"></app-menu>
  </q-menu>
</template>

<script>
import AppMenu from './Menu.vue';
import UserInfo from './UserInfo.vue';

export default {
  name: 'DropdownMenu',
  components: { AppMenu, UserInfo },
  props: ['user']
};
</script>
