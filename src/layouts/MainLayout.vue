<template>
  <q-layout view="lhh Lpr lFf">
    <q-header elevated>
      <q-toolbar style="height: 72px;" class="bg-white">
        <img
          height="32"
          src="../statics/app-logo-128x128.svg"
          @click="$router.push({ name: 'home' })"
          class="cursor-pointer"
          alt="ipms"
        >

        <q-input
          v-model="search"
          class="q-ml-md"
          placeholder="Search for projects"
          rounded
          outlined
          dense
          style="width: 100%; max-width: 380px;"
          debounce="500"
          @keyup.enter="searchProjects"
          v-if="loggedIn"
        >
          <template v-slot:prepend>
            <q-icon name="search" @click="searchProjects" />
          </template>
        </q-input>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn color="primary" flat :label="$q.screen.gt.md ? 'Dashboard': void 0" :icon="$q.screen.gt.md ? void 0 : 'dashboard'" to="/dashboard"></q-btn>
          <q-btn color="primary" flat :label="$q.screen.gt.md ? 'Projects': void 0" :icon="$q.screen.gt.md ? void 0 : 'list'">
            <q-menu>
              <q-list>
                <q-item clickable v-close-popup to="/projects/add">
                  <q-item-section avatar>
                    <q-icon name="add" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Add</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup to="/user/projects">
                  <q-item-section avatar>
                    <q-icon name="list" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>My Projects</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup to="/projects">
                  <q-item-section avatar>
                    <q-icon name="list" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>All Projects</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn color="primary" flat :label="$q.screen.gt.md ? 'Settings': void 0" :icon="$q.screen.gt.md ? void 0 : 'settings'" to="/settings"></q-btn>
          <q-btn color="primary" flat :icon="$q.screen.gt.md ? void 0 : 'more_vert'" :label="$q.screen.gt.md ? 'More': void 0">
            <q-menu>
              <q-list>
                <q-item clickable v-close-popup to="/user/edit-account">
                  <q-item-section avatar>
                    <q-icon name="person" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Account</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="openURL('https://discord.com/app', null, { target: '_blank' })">
                  <q-item-section avatar>
                    <q-icon name="fab fa-discord" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Ask Help</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="confirmLogout">
                  <q-item-section avatar>
                    <q-icon name="exit_to_app" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Logout</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn
            round
            dense
            flat
            color="primary"
            :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
            @click="$q.fullscreen.toggle()"
            v-if="$q.screen.gt.sm">
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-10 col-lg-8 col-xl-6" style="margin: auto">
          <router-view />
        </div>
      </div>
    </q-page-container>

    <q-footer>

    </q-footer>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MainLayout',
  data() {
    return {
      leftDrawerOpen: false,
      appName: process.env.APP_SHORTNAME
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.loggedIn
    },
    search: {
      get() {
        return this.$store.state.projects.search
      },
      set(val) {
        this.$store.dispatch('projects/setSearch', val)
      }
    }
  },
  methods: {
    openURL,
    confirmLogout() {
      this.$q.dialog({
        title: 'Confirm Logout',
        message: 'Are you sure you want to logout?',
        cancel: true
      }).onOk(() => {
        this.$store.dispatch('auth/signoutUser')
          .then(() => {
            this.$router.replace('/login')
          })
          .catch(err => console.log(err.message))
      })
    },
    searchProjects() {
      this.$router.push('/projects')
    }
  }
}
</script>
