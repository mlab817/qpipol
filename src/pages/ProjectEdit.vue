<template>
  <page-container>
    <template v-slot:title>
      <page-title title="Update Project" icon="edit">
        <q-btn icon="refresh" flat round @click="refetchProject"></q-btn>
      </page-title>
    </template>

    <div style="position: relative;">
      <div class="text-h6" v-if="$apollo.loading">Loading...</div>
      <edit-pipol @saved="saved = true" :project="project" v-else></edit-pipol>
    </div>
  </page-container>
</template>

<script>
import PageTitle from '@/ui/page/PageTitle';
import PageContainer from '@/ui/page/PageContainer';
import EditPipol from '../components/projects/EditPipol';
import { FETCH_PROJECT_QUERY } from '@/graphql';

export default {
  components: {
    EditPipol,
    PageContainer,
    PageTitle
  },

  name: 'PageEditProject',

  apollo: {
    project: {
      query: FETCH_PROJECT_QUERY,
      variables() {
        return {
          id: this.$route.params.id
        };
      },
      result({ data }) {
        // if project is not found
        if (data.project === null) {
          this.error = true;
          this.errorMessage = 'Project not found.';
        }
      },
      error(error) {
        this.error = JSON.stringify(error.message);
      }
    }
  },

  data() {
    return {
      project: {},
      saved: false,
      error: null
    };
  },

  methods: {
    refetchProject() {
      this.$apollo.queries.project.refetch();
    }
  },

  beforeRouteLeave(to, from, next) {
    if (!this.saved && (!this.project.finalized || !this.project.endorsed)) {
      const answer = window.confirm(
        'Do you really want to leave? Your progress will not be saved.'
      );
      if (answer) {
        next();
      } else {
        next(false);
      }
    } else {
      next();
    }
  }
};
</script>

<style scoped>
hr >>> .q-separator {
  width: 5px;
}
</style>
