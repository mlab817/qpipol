<template>
  <q-menu square max-width="300px" :offset="[0, 15]">
    <q-img
			class="absolute-top"
			src="~assets/agri.jpg"
			style="height: 190px; z-index: -1;"
		>
      <q-btn
        flat
        round
        dense
        icon="refresh"
        class="absolute all-pointer-events cursor-pointer"
        size="md"
        color="white"
        style="top: 8px; right: 8px; z-index: 999"
        @click="refetch"
      >
        <q-tooltip>
          Refresh user
        </q-tooltip>
      </q-btn>
      <div class="absolute-bottom bg-transparent text-center">
        <q-avatar size="56px" class="q-mb-sm">
          <img :src="user ? user.user_avatar : ''" />
        </q-avatar>
        <div class="text-weight-bold text-uppercase">
          {{ user ? user.name : '' }}
        </div>
        <div>{{ user ? user.email : '' }}</div>
        <div>
          {{ user && user.operating_unit ? user.operating_unit.name : '' }}
        </div>
        <div>
          <q-badge>
            {{ user && user.role ? user.role.name : 'No role.' }}
          </q-badge>
        </div>
      </div>
    </q-img>

    <q-separator />

    <q-list style="min-width: 280px; margin-top: 185px;" dense>
      <menu-item label="Dashboard" to="/dashboard" icon="dashboard" />
      <menu-item label="Programs" to="/programs" icon="view_module" />
      <menu-item label="Projects" to="/projects" icon="list" />
      <menu-item label="Trash" to="/projects/trash" icon="delete" />
      <menu-item label="Profile" to="/profile" icon="tune" />
      <q-separator />
      <menu-item
        label="Activity"
        to="/activity"
        icon="work_outline"
      ></menu-item>
      <menu-item label="Security" to="/security" icon="vpn_key" />
      <menu-item label="Settings" to="/settings" icon="settings" />
      <q-separator />
      <menu-item
				label="Report Issues"
				icon="open_in_new"
        @click="openURL('https://github.com/mlab817/qpipol/issues')"
        type="a"
        target="_blank"
      />
      <q-separator></q-separator>
			<menu-item label="Logout" icon="exit_to_app" @click="handleSignoutUser"></menu-item>
    </q-list>
  </q-menu>
</template>

<script>
import { openURL } from 'quasar';
import MenuItem from './MenuItem';
import { GET_CURRENT_USER } from '@/graphql';

export default {
  name: 'DropdownMenu',

  components: { MenuItem },

  props: ['user'],

  apollo: {
    getCurrentUser: {
      query: GET_CURRENT_USER
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

    openURL,

    refetch() {
      this.$apollo.queries.getCurrentUser.refetch();
    }
  }
};
</script>
