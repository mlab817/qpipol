<template>
  <q-list>
    <menu-item @click="viewProject" label="View" icon="search"></menu-item>

    <menu-item
      @click="updateProject"
      label="Update"
      icon="update"
      v-if="showUpdateItem"
      tooltip="Restricted to owner only"
    ></menu-item>

    <menu-item
      @click="validateProject"
      label="Validate"
      icon="fact_check"
      v-if="isReviewer && status === 'Endorsed'"
    ></menu-item>

    <q-separator />

    <menu-item
      @click="handleTransferProject"
      label="Transfer"
      icon="subdirectory_arrow_right"
      tooltip="Restricted to owner only"
      :disable="!isOwner && !isDraft"
    ></menu-item>

    <q-separator />

    <menu-item
      @click="promptDelete(id)"
      label="Delete"
      icon="delete"
      tooltip="Restricted to owner only"
      :disable="!isOwner || !isDraft"
    ></menu-item>

    <q-separator />

		<menu-item
			:to="signedCopy"
			label="Download"
			icon="save_alt"
			v-if="signedCopy"/>

    <menu-item
      @click="downloadFile"
      label="Download"
      icon="save_alt"
			v-else
    ></menu-item>
  </q-list>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import MenuItem from './MenuItem';

import { validateEmail } from '@/utils';
import { SHARE_PROJECT, FETCH_ENCODERS_QUERY } from '@/graphql';
import { showError } from '@/utils';
import axios from 'axios';

export default {
  components: { MenuItem },

  name: 'ProjectMenu',

  props: {
    id: String,
    status: String,
    owner: [Number, String],
		signedCopy: String
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
      const owner = this.owner;
      const isOwner = this.user.id === owner;
      return isOwner;
    },
    isDraft() {
      return this.status === 'Draft'
    },
	  showValidateItem() {
		  const status = this.status;

		  return this.isReviewer && status === 'endorsed';
	  },
    showUpdateItem() {
      const status = this.status;

      return this.isOwner && (status === 'draft' || status === 'updated');
    },
    showTransferItem() {
      return this.isOwner;
    }
  },
  data() {
    return {
      fact_check: null,
      project: {},
      encoders: [],
      transferProjectDialog: false
    };
  },
  methods: {
    validateProject() {
      const id = this.$props.id;
      this.$router.push(`/projects/${id}/validate`);
    },
    viewProject() {
      const id = this.$props.id;
      this.$router.push(`/projects/${id}`, () => {});
    },
    reviewProject() {
      const id = this.$props.id;
      this.$router.push(`/projects/${id}/review`);
    },
    updateProject() {
      const id = this.$props.id;
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
          this.transferProject(this.$props.id, data);
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
        .dispatch('projects/download', { id: this.$props.id })
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
    }
  }
};
</script>
