<template>
  <q-layout view="lHr LpR lfr">
    <q-header bordered class="bg-accent">
      <app-header :user="getCurrentUser"></app-header>

      <q-separator color="secondary" class="header-separator" />
    </q-header>

    <q-footer
      bordered
      class="bg-info text-secondary text-lowercase items-center"
    >
      <app-footer></app-footer>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState } from 'vuex';
import AppHeader from '../ui/components/Header';
import AppFooter from '../ui/components/Footer';
import { GET_CURRENT_USER } from '@/graphql/queries';

export default {
  components: {
    AppFooter,
    AppHeader
  },

  name: 'AppLayout',

  data() {
    return {
      drawer: false,
      appTitle: 'IPMS',
      appTitleFooter: 'Investment Programming & Management System',
      copyright: 'Made by Mark Lester A. Bolotaolo',
      showAbout: false,
      processing_statuses: [],
      tabs: [
        {
          label: 'Dashboard',
          icon: 'dashboard',
          to: '/dashboard'
        },
        {
          label: 'Add Project',
          icon: 'add_box',
          to: '/projects/add'
        },
        {
          label: 'Projects',
          icon: 'view_list',
          to: '/projects'
        },
        {
          label: 'Profile',
          icon: 'tune',
          to: '/profile'
        },
        {
          label: 'Settings',
          icon: 'settings',
          to: '/settings'
        }
      ],
      user: {}
    };
  },

  computed: {
    ...mapState('settings', ['dark']),
    darkMode() {
      return this.$q.dark.isActive;
    },
    isAdmin() {
      return this.$store.getters['auth/isAdmin'];
    },
    isEncoder() {
      return this.$store.getters['auth/isEncoder'];
    },
    filteredTabs() {
      // This function hides the users tab if the user is not admin or superadmin
      let filteredTabs = [];

      if (this.isEncoder) {
        return this.tabs;
      }

      filteredTabs = this.tabs.filter(tab => tab.label !== 'Add Project');

      return filteredTabs;
    },
    mini() {
      return this.$q.screen.sm;
    }
  },

  apollo: {
    getCurrentUser: {
      query: GET_CURRENT_USER,
      result({ data }) {
        this.user = data.getCurrentUser;
      }
    }
  }
};
</script>

<style>
hr.q-separator.header-separator {
  height: 3px;
}
</style>
