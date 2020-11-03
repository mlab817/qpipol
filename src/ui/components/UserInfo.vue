<template>
  <q-img
    class="absolute-top"
    src="~assets/agri.jpg"
    style="height: 200px; z-index: 1;"
  >
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
</template>

<script>
export default {
  name: 'UserInfo',
  props: ['user'],
  methods: {
    refetch() {
      this.$apollo.queries.getCurrentUser.refetch();
    }
  }
}
</script>
