<template>
  <div
    class="row"
    :class="dark ? 'bg-accent text-white' : 'bg-white text-grey-9'"
  >
    <div
      class="offset-xl-2 col-xl-8 offset-lg-3 col-lg-6 offset-md-1 col-md-10 offset-sm-1 col-sm-10 offset-xs-0 col-xs-12"
    >
      <q-tabs
        align="left"
        :class="dark ? 'bg-accent text-white' : 'bg-white text-grey-9'"
      >
        <template v-for="({ to, icon, label }, index) in filteredTabs">
          <q-route-tab :key="index" :to="to" :icon="icon" exact> </q-route-tab>
        </template>
      </q-tabs>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'RouteTabs',
  props: ['filteredTabs'],
  computed: {
    ...mapState('settings', ['dark'])
  }
};
</script>
