<template>
  <page-container>
    <div class="text-h6" v-if="$apollo.loading">Loading...</div>

    <template v-slot:title>
      <page-title title="Project/Program Profile" icon="search">
				<archive-button @click="downloadFile" />
				<refresh-button @click="refetch" />
				<help-button @click="help" />
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
							icon="upload"
              color="white"
              label="Upload Signed Copy"
              @click="uploadSignedCopyDialog = true"
            />
          </template>
        </q-banner>
      </div>

      <div class="row justify-center q-gutter-sm q-mb-md">
        <q-btn
          label="Edit"
					icon="edit"
					color="blue"
          @click="$router.push(`/projects/${$route.params.id}/edit`)"
          v-if="owner && !project.finalized"
        />
      </div>

      <view-pipol :project="project" />

      <div class="row justify-center q-gutter-sm">
        <q-btn
          label="Edit"
					icon="edit"
          color="blue"
          @click="$router.push(`/projects/${$route.params.id}/edit`)"
          v-if="owner && !project.finalized"
        />
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
import { FETCH_PROJECT_QUERY } from '@/graphql/queries';
import axios from 'axios';
import { showError } from '@/utils';
import { openURL, exportFile } from 'quasar'
import UploadSigned from '../components/projects/shared/UploadSigned';
import RefreshButton from '../ui/buttons/RefreshButton'
import ArchiveButton from '../ui/buttons/ArchiveButton'
import HelpButton from '../ui/buttons/HelpButton'

export default {
  components: {
	  HelpButton,
	  ArchiveButton,
	  RefreshButton,
    UploadSigned,
    PageContainer,
    PageTitle,
	  ViewPipol
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
      // fixed error #50
      return this.project.creator && this.project.creator.id === this.user.id;
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
		help() {
    	this.$q.dialog({
				title: 'Project/Program Profile',
				message: 'Only the owner of the project and the reviewer assigned to the operating unit can edit it. Hit refresh to get the latest data on the project. Click the download button to download the project in .DOCX format (if not endorsed) or signed copy, otherwise.',
				cancel: true
			})
		},

    downloadFile() {
    	const options = [{
					value: 'docx',
					label: 'Microsoft Word'
				},
				{
					value: 'signed',
					label: 'Signed Copy (if uploaded)'
				},
				{
					value: 'json',
					label: 'JSON'
				}]

				this.$q.dialog({
					title: 'Download',
					message: 'Choose what file to download',
					cancel: true,
					options: {
						items: options,
						isValid: val => !!val,
						model: 'docx'
					}
				}).onOk(data => {
					if (data === 'docx') {
						this.downloadDocx()
					} else if (data === 'signed') {
						this.downloadSignedCopy()
					} else if (data === 'json') {
						this.downloadJson()
					}
				})
    },

		downloadSignedCopy() {
    	if (this.project.signed_copy_link) {
		    openURL(project.signed_copy_link)
			} else {
    		alert('Signed copy has not been uploaded yet')
			}
		},

		downloadJson() {
			const project = this.project

			const status = exportFile(`project_${project.id}.json`, JSON.stringify(project), 'text/json')

			if (status === true) {
				this.$q.notify({
					type: 'positive',
					message: 'File downloaded'
				})
			} else {
				this.$q.notify({
					type: 'negative',
					message: `Error ${status}`
				})
			}
		},

		downloadDocx() {
			  this.$q.loading.show({
			    message: 'This may take a while as the file is being generated.'
			  });
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
