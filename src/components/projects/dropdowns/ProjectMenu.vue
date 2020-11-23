<template>
  <q-list>
    <menu-item @click="viewProject" label="View" icon="search"></menu-item>

    <menu-item
      @click="updateProject"
      label="Edit"
      icon="edit"
      v-if="isDraft"
      tooltip="Restricted to owner only"
    ></menu-item>

		<menu-item
			@click="handleTransferProject"
			label="Transfer"
			icon="subdirectory_arrow_right"
			tooltip="Restricted to owner only"
			:disable="!isOwner"
		></menu-item>

		<menu-item
			@click="promptDelete(project.id)"
			label="Delete"
			icon="delete"
			tooltip="Restricted to owner only"
			:disable="!isOwner || !isDraft"
		></menu-item>

		<q-separator />

    <menu-item
      @click="validateProject"
      label="Validate"
      icon="fact_check"
      v-if="isReviewer && isEndorsed"
    ></menu-item>

    <q-separator />

    <menu-item
      @click="reclassifyProject(project)"
      label="Reclassify"
      icon="fas fa-tags"
      v-if="isReviewer"
    ></menu-item>

    <menu-item
      @click="createPrexcActivityFromProject(project)"
      label="Create Activity"
      icon="fas fa-plus-square"
      v-if="isReviewer && !project.prexc_activity_id"
    ></menu-item>

  </q-list>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { validateEmail, showError } from '@/utils';
import { SHARE_PROJECT, FETCH_ENCODERS_QUERY } from '@/graphql';
import axios from 'axios';
import { Dialog } from 'quasar'
import MenuItem from './MenuItem';
import BannerProgram from './BannerProgram'
import {
  projectService
} from '@/services'
import {BANNER_PROGRAMS} from '../../../graphql/queries'
import { openURL } from 'quasar'

export default {
  components: {
    MenuItem
  },

  name: 'ProjectMenu',

  props: {
    project: {
    	type: Object,
			required: true
		}
  },

  apollo: {
    encoders: {
      query: FETCH_ENCODERS_QUERY,
      result({ data }) {
        this.encoders = data.encoders.map(encoder => {
          const { id, name, operating_unit } = encoder;
          return {
            value: id,
            label: `${name} - ${
              operating_unit ? operating_unit.acronym : 'N/A'
            }`
          };
        });
      }
    },
		banner_programs: {
    	query: BANNER_PROGRAMS
		}
  },

  computed: {
  	user() {
  		return this.$store.getters['auth/user']
		},
  	isReviewer() {
  		return this.$store.getters['auth/isReviewer']
		},
    isOwner() {
      return parseInt(this.user.id) === parseInt(this.project.created_by);
    },
    isDraft() {
      return this.project.submission_status && this.project.submission_status.name === 'Draft'
    },
	  isEndorsed() {
		  return this.project.submission_status && this.project.submission_status.name === 'Endorsed'
	  },
    showTransferItem() {
      return this.isOwner;
    }
  },
  data() {
    return {
      encoders: [],
      transferProjectDialog: false,
      reclassifyProjectDialog: false,
      banner_program_id: this.project.banner_program_id,
	    banner_programs: []
    };
  },
  methods: {
    openURL,
    validateProject() {
      const id = this.project.id;
      this.$router.push(`/projects/${id}/validate`);
    },

    viewProject() {
      const id = this.project.id;
      if (id) {
	      // this.$router.push(`/projects/${id}`, () => {});
        openURL(`/projects/${id}`, null, { target: '_blank' })
			}
    },

    updateProject() {
      const id = this.project.id;
      this.$router.push(`/projects/${id}/edit`);
    },

    promptDelete(id) {
      this.$q
        .dialog({
          title: 'Delete Project',
          message: 'Are you sure you want to delete this project?',
          cancel: true
        })
        .onOk(() => {
          this.$q.loading.show('Deleting Project');
          this.$store
            .dispatch('projects/deleteProject', { id: id })
            .then(() => {
              this.$q.notify({
                type: 'positive',
                message: 'Project successfully deleted.',
                position: 'bottom-right'
              });
            })
            .catch(() => {
              this.$q.notify({
                type: 'negative',
                message: 'An error occurred.',
                position: 'bottom-right'
              });
            })
            .finally(() => this.$q.loading.hide());
        });
    },

    handleTransferProject() {
      // this.$emit('transfer');
      const encoders = this.encoders;

      this.$q
        .dialog({
          title: 'Transfer Project',
          message: 'Choose user to transfer to:',
          options: {
            type: 'radio',
            model: '',
            items: encoders,
            isValid: val => !!val
          },
          cancel: true,
          persistent: true
        })
        .onOk(data => {
          this.transferProject(this.project.id, data);
        });
    },

    transferProject(id, user) {
      this.$store
        .dispatch('projects/transfer', {
          project_id: id,
          user_id: user
        })
        .then(() =>
          this.$q.notify({
            type: 'positive',
            message: 'Successfully transferred project.'
          })
        );
    },

    downloadFile() {
      this.$q.loading.show('Generating file...');

      this.$store
        .dispatch('projects/download', { id: this.project.id })
        .then(res => {
          return axios
            .post(process.env.REPORT_ENDPOINT, res.project, {
              responseType: 'arraybuffer',
              headers: {
                'content-type': 'application/json',
                accept: 'application/octet-stream'
              }
            })
            .then(res => {
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
            .catch(err => console.log(err.message));
        })
        .catch(err => console.log(err.message))
        .finally(() => this.$q.loading.hide());
    },

    reclassifyProject(project) {
    	const banner_programs = this.banner_programs && this.banner_programs.map(x => {
    		return {
    			value: x.id,
					label: x.name
				}
			})
    	this.$q.dialog({
				title: `${project.title}`,
				message: 'Select banner program to classify',
				options: {
					items: banner_programs,
					model: project.banner_program_id
				},
				cancel: true
			})
			.onOk(bannerProgram => {
		    this.$q.loading.show()
				const payload = {
		    	id: this.project.id,
					banner_program_id: bannerProgram
				}
		    projectService.reclassifyProject(payload)
			    .then(() => {
			    	this.$q.notify({
							type: 'positive',
							message: 'Success'
						})
					})
			    .catch(err => {
						this.$q.notify({
							type: 'negative',
							message: err.message
						})
					})
			    .finally(() => {
				    this.$q.loading.hide()
			    })
			})

      const payload = {
        id: this.project.id,
        banner_program_id: this.banner_program_id
      }


    },

    createPrexcActivityFromProject(project) {
      this.$q.dialog({
        title: 'Create Activity',
        message: `Are you sure you want to create a prexc activity entry from this project: <strong>${project.title}</strong>?`,
				html: true,
        cancel: true
      }).onOk(() => {
        this.$q.loading.show()
        projectService.createPrexcActivityFromProject({
          id: project.id
        })
        .then(() => this.$q.notify({
          type: 'positive',
          message: 'Success'
        }))
        .catch(err => this.$q.notify({
          type: 'negative',
          message: err.message
        }))
        .finally(() => this.$q.loading.hide())
      })
    }
  }
};
</script>
