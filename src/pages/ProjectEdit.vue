<template>
  <page-container>
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

        <edit-pipol :project="project" ></edit-pipol>
      </template>
    </div>
  </page-container>
</template>

<script>
import PageContainer from 'src/ui/page/PageContainer';
import EditPipol from '../components/projects/EditPipol';
import { PROJECT_FIND_BY_SLUG } from "src/graphql";
import {date} from "quasar";

export default {
  components: {
    EditPipol,
    PageContainer,
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
  },
  filters: {
    showDate(val) {
      return date.formatDate(val, 'MMM D, YYYY hh:mm:ss A');
    }
  }
};
</script>
