<template>
  <page-container>
    <template v-slot:title>
      <page-title title="Update Project" icon="edit">
				<refresh-button @click="refetchProject" />
      </page-title>
    </template>

    <div style="position: relative;">
      <div class="text-h6" v-if="$apollo.loading">Loading...</div>
      <template v-else>
        <div class="column q-pa-md q-mb-md bg-grey-9 text-white" style="min-height: 200px; background-color: #3c3b37">
          <div class="row">
            <q-breadcrumbs class="text-weight-bolder text-info">
              <q-breadcrumbs-el :label="project.prexc_program && project.prexc_program.acronym" />
              <q-breadcrumbs-el :label="project.prexc_subprogram && project.prexc_subprogram.acronym" />
              <q-breadcrumbs-el :label="project.prexc_activity && project.prexc_activity.acronym" />
            </q-breadcrumbs>
          </div>

          <div class="row text-h4">
            {{ project.title }}
          </div>
          <div class="row text-subtitle1">
            {{ project.description ? project.description.substr(0, 200) : '' }}
          </div>
          <div class="row text-subtitle2">
            Created by <span class="text-info">&nbsp;{{ project.creator ? project.creator.name : '' }}</span>
          </div>
          <div class="row text-subtitle2 items-center">
            <q-icon name="event" />  Last updated on {{ project.updated_at | showDate }}
          </div>
        </div>

        <edit-pipol @saved="saved = true" :project="project" ></edit-pipol>
      </template>
    </div>
  </page-container>
</template>

<script>
import PageTitle from '@/ui/page/PageTitle';
import PageContainer from '@/ui/page/PageContainer';
import EditPipol from '../components/projects/EditPipol';
import { FETCH_PROJECT_QUERY } from '@/graphql';
import RefreshButton from '../ui/buttons/RefreshButton'
import {PROJECT_FIND_BY_SLUG} from "src/graphql";

export default {
  components: {
	  RefreshButton,
    EditPipol,
    PageContainer,
    PageTitle
  },

  name: 'PageEditProject',

  apollo: {
    projectFindBySlug: {
      query: PROJECT_FIND_BY_SLUG,
      variables() {
        return {
          slug: this.$route.params.slug
        };
      },
      result({ data }) {
        // if project is not found
        this.project = data.projectFindBySlug
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
