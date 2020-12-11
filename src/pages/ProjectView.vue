<template>
  <page-container>
    <div
      class="row justify-center q-pb-md relative-position"
      v-if="project.finalized && !project.endorsed && !project.signed_copy"
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
          <!-- <q-btn flat label="Changed my Mind" @click="revertToDraftProject" color="negative" /> -->
          <q-btn flat label="Download" @click="downloadFile" />
          <q-btn
            flat
            color="white"
            label="Upload Signed Copy"
            @click="uploadSignedCopyDialog = true"
          />
        </template>
      </q-banner>

      <q-inner-loading :showing="$apollo.loading">
        <q-spinner />
      </q-inner-loading>
    </div>

    <div class="column q-pa-md q-mb-md bg-grey-9 text-white" style="min-height: 200px; background-color: #3c3b37" v-if="!$apollo.loading">
      <div class="row">
        <q-breadcrumbs class="text-weight-bolder text-info">
          <q-breadcrumbs-el :label="project.prexc_program ? project.prexc_program.acronym : '-'" />
          <q-breadcrumbs-el :label="project.prexc_subprogram ? project.prexc_subprogram.acronym : '-'" />
          <q-breadcrumbs-el :label="project.prexc_activity ? project.prexc_activity.acronym : '-'" />
        </q-breadcrumbs>
      </div>

      <div class="row text-h4">
        {{ project.title }}
      </div>
      <div class="row text-subtitle1">
        {{ project.description ? project.description.substr(0, 200) + '...' : '' }}
      </div>
      <div class="row text-subtitle2">
        Created by <span class="text-info">&nbsp;{{ project.creator ? project.creator.name : '' }}</span>
      </div>
      <div class="row text-subtitle2 items-center">
        <q-icon name="event" />  Last updated on {{ project.updated_at | showDate }}
      </div>
      <div class="row q-py-sm justify-start">
        <q-btn v-if="project.permissions.update" icon="edit" label="Edit" outline :to="`/projects/${$route.params.slug}/edit`" />
        <q-btn v-if="project.permissions.delete" icon="delete" label="Delete" outline class="q-ml-sm" @click="confirmDelete" />
        <q-btn icon="share" label="Share" outline class="q-ml-sm" @click="shareProject" />
      </div>
    </div>

    <view-pipol :project="project" />

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
// import { FETCH_PROJECT_QUERY } from '@/graphql/queries';
import { showError, generateDocx } from '@/utils';
import { openURL, exportFile } from 'quasar'
import UploadSigned from '../components/projects/shared/UploadSigned';
import { projectService } from '@/services'
import { PROJECT_FIND_BY_SLUG } from "src/graphql";
import { date } from 'quasar'
import ShareLink from "components/ShareLink";
import {
  showSuccessNotification,
  showErrorNotification
} from "src/functions";

export default {
  components: {
    UploadSigned,
    PageContainer,
	  ViewPipol
  },
  name: 'ViewProject',
  apollo: {
    projectFindBySlug: {
      query: PROJECT_FIND_BY_SLUG,
      variables() {
        return {
          slug: this.$route.params.slug
        };
      },
      error(error) {
        this.error = error;
      },
      result({ data }) {
        this.project = data.projectFindBySlug
      }
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
			generateDocx(this.project)
		},

    revertToDraftProject() {
      this.$q.dialog({
        title: 'Revert this Project to Draft',
        message: 'Are you sure you want to revert this project to draft? Type <strong>YES</strong> to confirm.',
        html: true,
        prompt: {
          model: '',
          isValid: val => val && val.toLowerCase() === 'yes'
        },
        cancel: true
      }).onOk(() => {
        this.$q.loading.show()
        projectService.revertToDraftProject({
          id: this.project.id
        })
        .then(() => this.$q.loading.hide())
        .catch(err => this.$q.notify({
          type: 'negative',
          message: err.message
        }))
        .finally(() => this.$q.loading.hide())
      })
    },

    shareProject() {
      const link = window.location.href

      this.$q.dialog({
        component: ShareLink,
        url: link
      }).onOk(() => {
        this.$q.dialog({
          title: 'Share this project',
          message: 'Enter email to send the project to',
          prompt: {
            model: '',
            placeholder: 'email@example.com',
            outlined: true
          },
          cancel: true,
          square: true
        }).onOk(data => {
          this.$q.loading.show()
          projectService.shareProject({
            email: data,
            url: link
          }).then(() => this.$q.notify({
            type: 'positive',
            message: 'Success'
          }))
            .finally(() => this.$q.loading.hide())
        })
      })
    },

    confirmDelete() {
      const id = this.project && this.project.id,
        title = this.project && this.project.title

      const message = `Are you sure you want to delete this project: <strong>${title}<\/strong>? Type <strong>Yes<\/strong> if you agree.`

      this.$q.dialog({
        title: 'Confirm delete',
        message: message,
        cancel: true,
        html: true,
        prompt: {
          model: '',
          isValid: val => val && val.toLowerCase() === 'yes'
        }
      }).onOk(() => {
        this.$q.loading.show()
        projectService.delete({id: id})
          .then(() => showSuccessNotification())
          .catch(err => showErrorNotification(err.message))
          .finally(() => this.$q.loading.hide())
      })
    }
  },
  filters: {
    showDate(val) {
      if (!val) {
        return ''
      }
      return date.formatDate(val, 'MM/D/YYYY')
    }
  }
};
</script>
