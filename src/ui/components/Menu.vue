<template>
  <q-list dense>
    <menu-item label="Dashboard" to="/dashboard" icon="fas fa-tachometer-alt" />
    <menu-item label="Programs" to="/programs" icon="fas fa-list" v-if="!isReviewer" />
    <menu-item label="Projects" to="/projects" icon="fas fa-tasks" v-if="!isReviewer" />
    <menu-item label="Review Programs" to="/review" icon="fas fa-list" v-if="isReviewer" />
    <menu-item label="Review Projects" to="/projects" icon="fas fa-tasks" v-if="isReviewer" />
		<menu-item label="Consolidators" to="/consolidates" icon="fas fa-layer-group" />
    <menu-item label="Deleted Projects" to="/projects/trash" icon="fas fa-trash-alt" />
		<q-separator />
    <menu-item label="Profile" to="/profile" icon="fas fa-id-card" />
    <menu-item label="Security" to="/security" icon="fas fa-fingerprint" />
    <menu-item label="Settings" to="/settings" icon="fas fa-cog" />
		<q-separator />
    <menu-item
      label="#AskHelp"
      icon="fab fa-discord"
      @click="openURL('https://discord.com')"
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
    computed: {
      isReviewer() {
        return this.$store.getters['auth/isReviewer']
      }
    },
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
