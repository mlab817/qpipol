<template>
  <page-container>
    <template v-slot:title>
      <page-title title="Encode Project">
        <q-btn label="Encoded"></q-btn>
      </page-title>
    </template>

    <project-profile :project="project"></project-profile>
  </page-container>
</template>

<script>
import { FETCH_PROJECT_QUERY } from '@/graphql/queries';
import PageContainer from '@/ui/page/PageContainer';
import PageTitle from '@/ui/page/PageTitle';
import ProjectProfile from '../../components/projects/ProjectProfile';
import { Dialog } from 'quasar';

export default {
  components: {
    PageContainer,
    PageTitle,
    ProjectProfile
  },
  name: 'PageEncodeProject',
  apollo: {
    project: {
      query: FETCH_PROJECT_QUERY,
      variables() {
        return {
          id: this.$route.params.id
        };
      },
      error() {
        Dialog.create({
          title: 'Not Found',
          message:
            'Project was not found. It is either you are not allowed access to the project or the project has been deleted.'
        }).onDismiss(() => this.$router.push('/projects/approved'));
      }
    }
  },
  data() {
    return {
      project: {}
    };
  }
};
</script>
