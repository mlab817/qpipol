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
          />
        </div>
      </page-title>
    </template>

    <div class="col">
			<key-facts :project="project"></key-facts>

			<edit-pipol :project="project" @validate="handleValidateProject" />
    </div>
  </page-container>
</template>

<script>
import EditPipol from '../components/projects/EditPipol'
const PageTitle = () =>
  import(/* webpackChunkName: 'PageTitle' */ '@/ui/page/PageTitle');
const PageContainer = () =>
  import(/* webpackChunkName: 'PageContainer' */ '@/ui/page/PageContainer');

import { FETCH_PROJECT_QUERY } from '@/graphql/queries';
import ValidateProject from '../components/projects/dialogs/ValidateProject';
import KeyFacts from '../components/projects/shared/KeyFacts'

export default {
  components: {
	  KeyFacts,
	  EditPipol,
    PageTitle,
    PageContainer
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
		  this.$q
			  .dialog({
				  title: 'Confirm Validation',
				  message:
					  "Be sure to save your changes before clicking the <strong>validate</strong>  project or you'll lose them. Done saving? Type <strong>YES</strong> to confirm.",
				  html: true,
				  cancel: true,
				  prompt: {
					  model: '',
					  isValid: val => val.toLowerCase() === 'yes'
				  }
			  })
			  .onOk(() => this.validateProject());
	  },

	  validateProject() {
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
