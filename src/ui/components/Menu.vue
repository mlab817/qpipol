<template>
  <q-list dense>
    <menu-item label="Dashboard" to="/dashboard" icon="dashboard" />
    <menu-item label="Programs" to="/programs" icon="view_module" />
    <menu-item label="Consolidators" to="/consolidates" icon="pageview" />
    <menu-item label="Projects" to="/projects" icon="list" />
    <menu-item label="Deleted Projects" to="/projects/trash" icon="delete" />
    <menu-item label="Profile" to="/profile" icon="tune" />
    <q-separator />
    <menu-item label="Security" to="/security" icon="vpn_key" />
    <menu-item label="Settings" to="/settings" icon="settings" />
    <q-separator />
    <menu-item
      label="#AskHelp"
      icon="help"
      @click="openURL('https://ipmsglobal.slack.com')"
      type="a"
      target="_blank"
    />
    <q-separator></q-separator>
    <menu-item label="Logout" icon="exit_to_app" @click="handleSignoutUser"></menu-item>
  </q-list>
</template>

<script>
  import { openURL } from 'quasar';
  import MenuItem from './MenuItem';

  export default {
    name: 'AppMenu',
    components: { MenuItem },
    methods: {
      handleSignoutUser() {
        this.$q
          .dialog({
            title: 'Logout',
            message: 'Are you sure you want to log out?',
            cancel: true
          })
          .onOk(() => this.$store.dispatch('auth/signoutUser'));
      },
      openURL
    }
  }
</script>
