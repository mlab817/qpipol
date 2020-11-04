<template>
  <q-layout view="lHr LpR lfr">
    <q-header bordered class="bg-accent">
      <app-header :user="getCurrentUser"></app-header>

      <q-separator color="secondary" class="header-separator" />
    </q-header>

    <q-drawer
        v-model="drawer"
        show-if-above
        :mini="!drawer || miniState"
        @click.capture="drawerClick"
        :mini-state="miniState"
        :breakpoint="500"
        bordered
        content-class="bg-grey-1"
      >

      <q-scroll-area style="height: calc(100% - 200px); margin-top: 200px; border-right: 1px solid #ddd">
        <app-menu :user="getCurrentUser" />
      </q-scroll-area>

      <user-info :user="getCurrentUser" v-if="!miniState"></user-info>

      <div class="q-mini-drawer-hide absolute" style="top: 60px; right: -17px; z-index: 999">
        <q-btn
          dense
          round
          unelevated
          color="secondary"
          icon="chevron_left"
          @click="miniState = true"
        />
      </div>
      
    </q-drawer>

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
import AppMenu from '../ui/components/Menu'
import UserInfo from '../ui/components/UserInfo'
import { GET_CURRENT_USER } from '@/graphql/queries';

export default {
  components: {
    AppFooter,
    AppHeader,

    AppMenu,
    UserInfo
  },

  name: 'AppLayout',

  apollo: {
    getCurrentUser: {
      query: GET_CURRENT_USER,
      result({ data }) {
        this.user = data.getCurrentUser;
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
