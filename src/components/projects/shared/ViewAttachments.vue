<template>
  <div class="col-3 q-pa-sm q-gutter-y-sm">
    <div class="column">
      <q-list bordered>
        <div class="row">
          <q-item-label header>Attachments</q-item-label>
          <q-space />
          <q-btn
            flat
            label="add"
            @click="uploadAttachment = true"
            v-if="isOwner"
          ></q-btn>
        </div>

        <q-item :class="!project.signed_copy_link ? 'text-negative' : ''">
          <q-item-section avatar>
            <q-icon name="attachment"></q-icon>
          </q-item-section>
          <q-item-section>
            <q-item-label>
              Signed Copy
              <span v-if="!project.signed_copy_link"
                >(<q-icon name="warning"></q-icon> None)</span
              >
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-btn
              v-if="project.signed_copy_link"
              flat
              round
              size="sm"
              icon="open_in_new"
              color="blue"
              target="_blank"
              type="a"
              :href="project.signed_copy_link"
            ></q-btn>
            <q-btn
              v-if="!project.signed_copy_link && project.finalized"
              icon="publish"
              flat
              round
              @click="uploadSignedCopyDialog = true"
            ></q-btn>
          </q-item-section>
        </q-item>

        <template v-if="project.endorsement">
          <q-item>
            <q-item-section avatar>
              <q-icon name="attachment"></q-icon>
            </q-item-section>
            <q-item-section>
              <q-item-label>
                Endorsement
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn
                flat
                round
                size="sm"
                icon="open_in_new"
                color="blue"
                target="_blank"
                type="a"
                :href="project.endorsement.link"
              ></q-btn>
            </q-item-section>
          </q-item>
        </template>
        <template v-if="!project.attachments.length">
          <q-item>
            <q-item-section avatar>
              <q-icon color="red" name="warning"></q-icon>
            </q-item-section>
            <q-item-section>
              <q-item-label>
                No other attachments.
              </q-item-label>
            </q-item-section>
          </q-item>
        </template>
        <template v-else>
          <q-item v-for="att in project.attachments" :key="att.id">
            <q-item-section avatar>
              <q-avatar class="bg-green text-white">
                <q-icon color="white" name="sticky_note_2"></q-icon>
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ att.attachment_type.name }}</q-item-label>
              <q-item-label caption
                >{{ Math.ceil(att.file_size / 1024) }} KB</q-item-label
              >
            </q-item-section>
            <q-item-section side>
              <q-btn
                flat
                round
                size="sm"
                icon="open_in_new"
                color="blue"
                target="_blank"
                type="a"
                :href="att.dropbox_link"
              ></q-btn>
              <q-btn
                flat
                round
                size="sm"
                icon="delete"
                color="red"
                @click="confirmDelete(att.id)"
              ></q-btn>
            </q-item-section>
          </q-item>
        </template>
      </q-list>
    </div>

    <q-list
      bordered
      class="q-mt-md"
      v-if="
        this.$route.fullPath.includes('validate') &&
          project.processing_status.name === 'endorsed'
      "
    >
      <q-item
        clickable
        target="_blank"
        tag="a"
        :href="project.endorsement ? project.endorsement.dropbox_link : void 0"
      >
        <q-item-section avatar>
          <q-avatar>
            <q-icon name="attach_file"></q-icon>
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>
            View Endorsement Letter
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <q-dialog v-model="uploadSignedCopyDialog">
      <upload-signed :id="project.id" @close="uploadSignedCopyDialog = false" />
    </q-dialog>

    <q-dialog v-model="uploadAttachment">
      <q-card style="min-width:400px;">
        <card-header
          title="Upload Attachment"
          @close="uploadAttachment = false"
        ></card-header>
        <q-form greedy ref="uploadAttachmentForm">
          <q-card-section class="q-gutter-y-sm">
            <single-select
              label="Attachment Type"
              v-model="attachment_type_id"
              :options="attachment_types"
              :rules="[val => !!val || '* Required']"
            ></single-select>

            <q-file
              filled
              v-model="file"
              accept=".pdf"
              label="Attachment (<5MB PDF files only)"
              :rules="[
                val =>
                  (!!val && checkFile(val)) || 'Must be PDF and less than 5MB'
              ]"
              lazy-rules
              stack-label
            ></q-file>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn
              flat
              label="Cancel"
              @click="uploadAttachment = false"
            ></q-btn>
            <q-btn
              color="primary"
              label="Upload"
              @click="handleUploadAttachment"
            ></q-btn>
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import SingleSelect from '@/ui/form-inputs/SingleSelect';
import CardHeader from '@/ui/cards/CardHeader';
import { ATTACHMENT_TYPES } from '@/graphql/queries';
import { showError } from '@/utils';
import UploadSigned from './UploadSigned';

export default {
  components: { UploadSigned, SingleSelect, CardHeader },

  name: 'ViewAttachments',

  props: ['project', 'isOwner'],

  apollo: {
    attachment_types: {
      query: ATTACHMENT_TYPES
    }
  },

  data() {
    return {
      attachment_type_id: null,
      file: null,
      uploadAttachment: false,
      uploadSignedCopyDialog: false
    };
  },

  methods: {
    checkFile(file) {
      return file.type === 'application/pdf' && file.size < 5242880;
    },

    handleUploadAttachment() {
      this.$refs.uploadAttachmentForm.validate().then(success => {
        if (success) {
          const payload = {
            project_id: this.project.id,
            attachment_type_id: this.attachment_type_id,
            file: this.file
          };
          this.uploadFile(payload);
        } else {
          alert('Please check inputs');
        }
      });
    },

    uploadFile(payload) {
      this.$q.loading.show();

      this.$store
        .dispatch('projects/uploadAttachment', payload)
        .then(() => {
          this.$q.notify({
            type: 'positive',
            message: 'Successfully uploaded attachment',
            position: 'bottom-right'
          });
          this.attachment_type_id = null;
          this.file = null;
        })
        .catch(showError)
        .finally(() => {
          this.uploadAttachment = false;
          this.$q.loading.hide();
        });
    },

    confirmDelete(id) {
      this.$q
        .dialog({
          title: 'Confirm Delete',
          message: 'Are you sure you want to delete this attachment?',
          cancel: true,
          transitionHide: 'jump-up',
          transitionShow: 'jump-down'
        })
        .onOk(() => this.deleteAttachment(id));
    },

    deleteAttachment(id) {
      const payload = {
        project_id: this.project.id,
        id: id
      };
      this.$store
        .dispatch('projects/deleteAttachment', payload)
        .then(() => {
          this.$q.notify({
            type: 'positive',
            message: 'Successfully deleted attachment',
            position: 'bottom-right'
          });
        })
        .catch(showError);
    }
  }
};
</script>
