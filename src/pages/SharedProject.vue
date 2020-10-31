<template>
  <q-page>
    <div class="relative">
      <page-title :title="viewSharedProject.title"></page-title>

      <project-profile :project="viewSharedProject"></project-profile>

      <inner-loading :loading="$apollo.loading"></inner-loading>
    </div>
  </q-page>
</template>

<script>
import { VIEW_SHARED_PROJECT } from '@/graphql';

export default {
  components: {
    'page-title': () => import('@/ui/page/PageTitle'),
    'project-profile': () => import('@/components/projects/ProjectProfile')
  },
  name: 'SharedProject',
  apollo: {
    viewSharedProject: {
      query: VIEW_SHARED_PROJECT,
      variables() {
        return {
          id: this.$route.params.id,
          token: this.$route.query.token
        };
      }
    }
  },
  props: ['token'],
  data() {
    return {
      viewSharedProject: {}
    };
  }
};
</script>

<style>
.relative {
  position: relative;
}
</style>
