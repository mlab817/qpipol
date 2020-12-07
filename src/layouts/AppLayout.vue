<template>
  <q-layout view="hhh lpR fff">
    <q-header class="bg-white">
      <app-header :user="user"></app-header>
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
import { GET_CURRENT_USER } from 'src/graphql';

export default {
  components: {
    AppFooter,
    AppHeader,
  },

  name: 'AppLayout',

  apollo: {
    me: {
      query: GET_CURRENT_USER,
      result({ data }) {
        this.user = data.me;
      }
    }
  },

  data() {
    return {
      drawer: false,
      miniState: false,
      appTitle: 'IPMS',
      appTitleFooter: 'Investment Programming & Management System',
      copyright: 'Made by Mark Lester A. Bolotaolo',
      showAbout: false,
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
  methods: {
    drawerClick (e) {
      // if in "mini" state and user
      // click on drawer, we switch it to "normal" mode
      if (this.miniState) {
        this.miniState = false

        // notice we have registered an event with capture flag;
        // we need to stop further propagation as this click is
        // intended for switching drawer to "normal" mode only
        e.stopPropagation()
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
