<template>
  <page-container>
    <template v-slot:title>
      <page-title title="Validate Project" icon="check">
        <div class="row q-gutter-sm" v-if="!validatedOrReturned">
          <q-btn
            icon="check"
            color="green"
            label="Validate"
            @click="handleValidateProject"
          >
          </q-btn>
          <q-btn
            icon="edit"
            color="red"
            label="Update"
            :to="`/projects/${project.id}/edit`"
          >
          </q-btn>
        </div>
      </page-title>
    </template>

    <div class="col">
      <q-scroll-area style="height: calc(100vh - 250px);">
        <project-profile :project="project"></project-profile>
      </q-scroll-area>
    </div>
  </page-container>
</template>

<script>
const PageTitle = () =>
  import(/* webpackChunkName: 'PageTitle' */ '@/ui/page/PageTitle');
const PageContainer = () =>
  import(/* webpackChunkName: 'PageTitle' */ '@/ui/page/PageContainer');
const ProjectProfile = () => import('../components/projects/ProjectProfile');

import { FETCH_PROJECT_QUERY } from '@/graphql/queries';
import ValidateProject from '../components/projects/dialogs/ValidateProject';

export default {
  components: {
    PageTitle,
    PageContainer,
    ProjectProfile
  },

  name: 'PageReviewProject',

  computed: {
    validatedOrReturned() {
      const status = this.project.processing_status
        ? this.project.processing_status.name
        : '';

      return status === 'returned' || status === 'validated';
    }
  },

  data() {
    return {
      remarks: null,
      showReturnProjectDialog: false,
      project: {},
      required: [val => !!val || '* Required'],
      validated: false
    };
  },

  apollo: {
    project: {
      query: FETCH_PROJECT_QUERY,
      variables() {
        return {
          id: this.$route.params.id
        };
      }
    }
  },

  methods: {
    handleReturnProject() {
      const id = this.$route.params.id;

      this.$q
        .dialog({
          title: 'Return Project',
          message: 'Add remarks.',
          prompt: {
            model: '',
            isValid: val => !!val || '* Required',
            type: 'textarea'
          },
          cancel: true,
          persistent: true
        })
        .onOk(data => {
          const payload = {
            project_id: id,
            remarks: data
          };
          this.$q.loading.show();
          this.$store.dispatch('projects/returnProject', payload).then(() => {
            this.$q.notify({
              type: 'positive',
              message: 'Successfully returned project.',
              position: 'bottom-right'
            });
            this.$q.loading.hide();
            this.validated = true;
          });
        });
    },

    handleValidateProject() {
      const id = this.$route.params.id;

      this.$q
        .dialog({
          component: ValidateProject,
          title: 'Validate Project'
        })
        .onOk(data => {
          const payload = {
            id: id,
            validation_data: data.validation_data,
            validation_signed: data.validation_signed,
            remarks: data.remarks
          };

          this.$q.loading.show();
          this.$store
            .dispatch('projects/validateProject', payload)
            .then(() => {
              this.$q.notify({
                type: 'positive',
                message: 'Successfully validated project.',
                position: 'bottom-right'
              });

              this.validated = true;
            })
            .finally(() => this.$q.loading.hide());
        });
    }
  }
};
</script>
