<template>
  <page-container>
    <div class="text-h6" v-if="$apollo.loading">Loading...</div>

    <template v-slot:title>
      <page-title title="Project Profile" icon="search">
        <q-btn
          flat
          color="white"
          icon="archive"
          @click="project.signed_copy_link ? openURL(project.signed_copy_link) : downloadFile" />
        <q-btn
          icon="refresh"
          @click="refetch"
          flat
          round
          dense
          class="q-mr-sm"
        ></q-btn>
      </page-title>
    </template>

    <template v-if="!$apollo.loading">
      <div
        class="row justify-center q-pb-md"
        v-if="project.finalized && !project.rendorsed && !project.signed_copy"
      >
        <q-banner
          class="bg-green-5 text-white col-xl-6 col-lg-6 col-md-8 col-sm-9 col-xs-12"
        >
          <template v-slot:avatar>
            <q-icon name="info" color="white" />
          </template>
          This project has been finalized. It cannot be edited. Upload a signed
          copy to endorse it to IPD.
          <template v-slot:action>
            <q-btn flat color="white" label="Download" @click="downloadFile" />
            <q-btn
              flat
              color="white"
              label="Upload Signed Copy"
              @click="uploadSignedCopyDialog = true"
            />
          </template>
        </q-banner>
      </div>

      <view-pipol :project="project" />

      <review-result :review="project.review" v-if="project.review" />

      <div class="row justify-center q-gutter-sm">
        <q-btn
          label="Edit"
          color="primary"
          @click="$router.push(`/projects/${$route.params.id}/edit`)"
          v-if="owner && !project.finalized"
        />
        <q-btn
          v-if="!project.endorsed && !project.signed_copy_link"
          label="Download"
          color="secondary"
          @click="downloadFile"
        />
        <q-btn
          v-if="project.signed_copy_link"
          color="secondary"
          target="_blank"
          type="a"
          label="Download"
          :href="project.signed_copy_link"
        ></q-btn>
      </div>
    </template>

    <q-dialog v-model="uploadSignedCopyDialog">
      <upload-signed
        :id="project.id"
        @close="uploadSignedCopyDialog = false"
      ></upload-signed>
    </q-dialog>
  </page-container>
</template>

<script>
import {
	PageTitle,
	PageContainer
} from '@/ui'
import ViewPipol from '@/components/projects/ViewPipol';
import ReviewResult from '@/components/projects/ReviewResult';
import { FETCH_PROJECT_QUERY } from '@/graphql/queries';
import axios from 'axios';
import { showError } from '@/utils';
import { openURL } from 'quasar'
import UploadSigned from '../components/projects/shared/UploadSigned';

export default {
  components: {
    UploadSigned,
    PageContainer,
    PageTitle,
	  ViewPipol,
    ReviewResult
  },
  name: 'ViewProject',
  apollo: {
    project: {
      query: FETCH_PROJECT_QUERY,
      variables() {
        return {
          id: this.$route.params.id
        };
      },
      error(error) {
        this.error = error;
      }
    }
  },
  computed: {
    selectedProjects() {
      return this.$store.state.projects.selectedProjects;
    },
    added() {
      return this.selectedProjects.includes(this.project);
    },
    finalized() {
      return this.project ? this.project.finalized : false;
    },
    endorsed() {
      return this.project ? this.project.endorsed : false;
    },
    user() {
      return this.$store.getters['auth/user'];
    },
    owner() {
      return this.project.creator.id === this.user.id;
    }
  },
  data() {
    return {
      project: {},
      shareProjectDialog: true,
      transferProjectDialog: false,
      loading: false,
      error: null,
      uploadSignedCopyDialog: false
    };
  },
  methods: {
    openURL,
    refetch() {
      this.$apollo.queries.project.refetch();
    },

    downloadFile() {
      this.$q.loading.show({
        message: 'This may take a while as the file is being generated.'
      });
      // console.log(process.env)
      axios
        .post(process.env.REPORT_ENDPOINT, this.project, {
          responseType: 'arraybuffer',
          headers: {
            'content-type': 'application/json',
            accept: 'application/pdf',
            'Access-Control-Expose-Headers': 'X-Suggested-Filename'
          }
        })
        .then(res => {
          console.log(res);
          const type = res.headers['content-type'];

          const blob = new Blob([res.data], {
            type: type,
            encoding: 'UTF-8'
          });

          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = 'export.docx';
          link.click();
        })
        .catch(err => showError(err))
        .finally(() => this.$q.loading.hide());
    }
  }
};
</script>
