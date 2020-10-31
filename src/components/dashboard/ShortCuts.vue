<template>
  <div>
    <div class="row">
      <q-item-label header class="q-px-none">Shortcuts</q-item-label>
    </div>

    <div class="row">
      <template v-for="(link, index) in filteredLinks">
        <div class="col-6" :key="index">
          <q-card flat square class="fit" bordered>
            <q-item clickable :to="link.url" v-ripple>
              <q-item-section>
                <q-item-label class="text-uppercase"
                  >{{ link.label }} {{ link.visible }}</q-item-label
                >
              </q-item-section>
              <q-item-section side top>
                <q-icon :name="link.icon" size="xl" />
              </q-item-section>
            </q-item>
          </q-card>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShortCuts',
  computed: {
    isEncoder() {
      return this.$store.getters['auth/isEncoder'];
    },
    role() {
      return this.$store.getters['auth/role'];
    },
    filteredLinks() {
      let filteredLinks = [];
      const role = this.role;

      if (role) {
        filteredLinks = this.links.filter(link => {
          if (link.hasAccess.length === 0) {
            return true;
          }
          return link.hasAccess.includes(role);
        });
      } else {
        filteredLinks = [];
      }
      return filteredLinks;
    }
  },
  data() {
    return {
      links: [
        {
          label: 'Add Project',
          icon: 'playlist_add',
          url: '/projects/add',
          color: 'secondary',
          hasAccess: ['encoder'],
          encoder: true
        },
        {
          label: 'Programs',
          icon: 'view_module',
          url: '/programs',
          color: 'secondary',
          hasAccess: ['encoder'],
          encoder: true
        },
        {
          label: 'Review Programs',
          icon: 'rate_review',
          url: '/review',
          color: 'secondary',
          reviewer: true,
          hasAccess: ['reviewer']
        },
        {
          label: 'Projects',
          icon: 'list',
          url: '/projects',
          color: 'blue',
          hasAccess: ['encoder']
        },
        {
          label: 'Review Projects',
          icon: 'list',
          url: '/projects',
          color: 'blue',
          hasAccess: ['reviewer']
        },
        {
          label: 'Trash',
          icon: 'delete',
          url: '/projects/trash',
          color: 'red',
          hasAccess: ['encoder']
        },
        {
          label: 'Activity',
          icon: 'work_outline',
          url: '/activity',
          hasAccess: []
        },
        {
          label: 'Profile',
          icon: 'tune',
          url: '/profile',
          color: 'primary',
          hasAccess: []
        },
        {
          label: 'Security',
          icon: 'vpn_key',
          url: '/security',
          color: 'red',
          hasAccess: []
        },
        {
          label: 'Settings',
          icon: 'settings',
          url: '/settings',
          color: 'pink',
          hasAccess: []
        }
      ]
    };
  }
};
</script>
