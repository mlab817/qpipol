<template>
  <q-list>
    <menu-item @click="viewProject" label="View" icon="search"></menu-item>
    <menu-item
      @click="viewReturned"
      label="View Returned"
      icon="search"
      v-if="showReturnedItem"
    ></menu-item>
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
      icon="img:statics/icons/fact_check-black-18dp.svg"
      v-if="showValidateItem"
    ></menu-item>
    <menu-item
      @click="reviewProject"
      label="Review"
      icon="rate_review"
      v-if="showReviewItem"
    ></menu-item>
    <menu-item
      @click="acceptProject"
      label="Accept"
      icon="playlist_add_check"
      v-if="showAcceptItem"
    ></menu-item>
    <menu-item
      @click="approveProject"
      label="Approve"
      icon="thumb_up_alt"
      v-if="showApproveItem"
    ></menu-item>
    <menu-item
      @click="encodeProject"
      label="Encode"
      icon="computer"
      v-if="showEncodeItem"
    ></menu-item>
    <q-separator />
    <menu-item
      @click="handleTransferProject"
      label="Transfer"
      icon="subdirectory_arrow_right"
      tooltip="Restricted to owner only"
      :disable="!showTransferItem"
    ></menu-item>
    <menu-item
      @click="handleShareProject"
      label="Share"
      icon="share"
      tooltip="Restricted to owner only"
      :disable="!isOwner"
    ></menu-item>
    <q-separator />
    <menu-item
      @click="promptDelete(id)"
      label="Delete"
      icon="delete"
      tooltip="Restricted to owner only"
      :disable="!isOwner"
    ></menu-item>
    <q-separator />
    <menu-item
      @click="downloadFile"
      label="Download"
      icon="save_alt"
      v-if="download"
    ></menu-item>
  </q-list>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import MenuItem from './MenuItem';

import { validateEmail } from '@/utils';
import { SHARE_PROJECT, FETCH_ENCODERS_QUERY } from '@/graphql';
// import { openURL } from 'quasar';
import ReturnProject from '../dialogs/ReturnProject';
import { showError } from '@/utils';
import axios from 'axios';

export default {
  components: { MenuItem },
  name: 'ProjectMenu',

  props: {
    id: String,
    status: String,
    ownerId: String,
    finalized: Boolean,
    download: {
      type: Boolean,
      default: false
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
    }
  },

  computed: {
    ...mapState('auth', ['user']),
    ...mapGetters('auth', ['isEncoder', 'isReviewer', 'isLead', 'isChief']),
    isOwner() {
      const ownerId = this.$props.ownerId;
      const isOwner = this.user.id === ownerId;
      return isOwner;
    },
    isDraft() {
      return this.$props.finalized;
    },
    showReviewItem() {
      const status = this.$props.status;

      return this.isReviewer && status === 'validated';
    },
    showUpdateItem() {
      const status = this.$props.status;

      // project not finalized
      // project finalized but no signed copy yet
      return this.isOwner && (status === 'created' || status === 'updated');
    },
    showValidateItem() {
      const status = this.$props.status;

      return this.isReviewer && status === 'endorsed';
    },
    showTransferItem() {
      return this.isOwner;
    },
    showAcceptItem() {
      const status = this.$props.status;

      return this.isLead && status === 'reviewed';
    },
    showApproveItem() {
      const status = this.$props.status;

      return this.isChief && status === 'accepted';
    },
    showEncodeItem() {
      const status = this.$props.status;

      return this.isReviewer && status === 'approved';
    },
    showReturnedItem() {
      const status = this.$props.status;

      return this.isOwner && status === 'returned';
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

    handleShareProject() {
      this.$q
        .dialog({
          title: 'Share Project',
          message: 'Please enter email you would like to send the project to.',
          prompt: {
            model: '',
            type: 'text',
            isValid: val => validateEmail(val)
          },
          cancel: true,
          persistent: true
        })
        .onOk(email => {
          this.shareProject(email);
        });
    },

    shareProject(email) {
      const id = this.$props.id;
      this.$apollo
        .mutate({
          mutation: SHARE_PROJECT,
          variables: {
            project_id: id,
            email: email
          }
        })
        .then(() => {
          this.$q.notify({
            type: 'positive',
            message: 'Successfully shared project',
            position: 'bottom-right'
          });
        })
        .catch(showError);
    },

    acceptProject() {
      const id = this.$props.id;

      this.$q
        .dialog({
          title: 'Accept Project',
          component: ReturnProject
        })
        .onOk(data => {
          this.$store.dispatch('projects/acceptProject', {
            id: id,
            remarks: data
          });
        });
    },

    approveProject() {
      const id = this.$props.id;

      this.$q
        .dialog({
          title: 'Approve Project',
          component: ReturnProject
        })
        .onOk(data => {
          this.$store.dispatch('projects/approveProject', {
            id: id,
            remarks: data
          });
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
                accept: 'application/pdf'
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
              link.download = 'export.pdf';
              link.click();
            })
            .catch(err => console.log(err.message));
        })
        .catch(err => console.log(err.message))
        .finally(() => this.$q.loading.hide());
    },

    viewReturned() {
      this.$router.push(`/projects/${this.$props.id}/returned`);
    }
  }
};
</script>
