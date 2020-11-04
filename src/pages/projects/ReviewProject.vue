<template>
  <page-container>
    <template v-slot:title>
      <page-title title="Review Project" icon="rate_review"></page-title>
    </template>

    <div class="row">
      <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
        <project-profile :project="project"></project-profile>
      </div>
      <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 q-pa-sm">
        <review-form
          :id="$route.params.id"
          :reviewed="project.review"
        ></review-form>
      </div>
    </div>
  </page-container>
</template>

<script>
const PageTitle = () =>
  import(/* webpackChunkName: 'PageTitle' */ '@/ui/page/PageTitle');
const PageContainer = () =>
  import(/* webpackChunkName: 'PageTitle' */ '@/ui/page/PageContainer');
const ProjectProfile = () => import('../../components/projects/ProjectProfile');
const ReviewForm = () => import('../../components/projects/ReviewForm');
import { FETCH_PROJECT_QUERY } from '@/graphql/queries';

export default {
  components: { PageTitle, PageContainer, ProjectProfile, ReviewForm },
  name: 'PageReviewProject',
  data() {
    return {
      remarks: null,
      showReturnProjectDialog: false,
      project: {}
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
      if (this.remarks) {
        const payload = {
          project_id: this.$route.params.id,
          remarks: this.remarks
        };

        this.$store.dispatch('projects/returnProject', payload);
      } else {
        alert('Remarks is required');
      }
    },
    handleValidateProject() {
      this.$q
        .dialog({
          title: 'Validate Project',
          message:
            'Validating project means that (1) it is already included in the endorsement and (2) the required information is complied with. Add remarks below.',
          prompt: {
            model: '',
            isValid: val => val.length >= 10,
            type: 'text'
          },
          persistent: true,
          cancel: true
        })
        .onOk(data => {
          const payload = {
            id: this.$route.params.id,
            remarks: data
          };
          this.$store.dispatch('projects/validateProject', payload);
          // Todo: implement validation logic here
        });
    }
  }
};
</script>
