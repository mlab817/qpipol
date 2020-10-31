<template>
  <div class="row q-pa-sm q-col-gutter-lg">
    <div class="col-3 justify-center">
      <div class="row">
        <q-img
          :src="user_avatar"
          @click="uploadAvatar = true"
          class="cursor-pointer"
          color="green"
          width="150px"
          height="150px"
        >
          <q-btn
            class="absolute text-grey-9 bg-grey-3"
            round
            color="grey"
            icon="camera_alt"
            style="bottom: 6px; right: 6px;"
          ></q-btn>
        </q-img>
      </div>
      <div class="row q-mt-md justify-center">
        <q-badge>{{ getCurrentUser.role.name }}</q-badge>
      </div>
    </div>

    <q-form greedy @submit="handleFormSubmit" @reset="handleReset" class="col">
      <div class="column q-gutter-y-md q-pa-sm">
        <div>Operating Unit: {{ getCurrentUser.operating_unit.name }}</div>
        <text-input
          label="Name"
          v-model="name"
          :rules="[val => !!val || '* Required']"
          :readonly="!edit"
        ></text-input>

        <text-input
          label="Nickname"
          v-model="nickname"
          :rules="[val => !!val || '* Required']"
          :readonly="!edit"
        ></text-input>

        <text-input
          v-model="position"
          label="Position/Designation"
          :rules="[val => !!val || '* Required']"
          :readonly="!edit"
        />

        <text-input
          v-model="contact_number"
          label="Contact No."
          hint="Include area code"
          :rules="[val => !!val || '* Required']"
          :readonly="!edit"
        />

        <div class="row q-mt-md">
          <q-btn
            type="submit"
            v-show="edit"
            label="Save Changes"
            color="primary"
          />
          <q-btn
            v-show="!edit"
            outline
            label="Edit Profile"
            @click="edit = true"
          ></q-btn>
        </div>
      </div>
    </q-form>

    <q-dialog v-model="uploadAvatar">
      <choose-avatar @close="uploadAvatar = false"></choose-avatar>
    </q-dialog>

    <!-- <q-dialog v-model="chooseAvatar" full-height position="right">
      <q-card class="column full-height">
        <q-card-section class="row justify-between q-pa-md">
          <div class="text-h6">Upload/Select Avatar</div>
          <q-btn flat round icon="close" v-close-popup />
        </q-card-section>

        <q-card-section class="col q-pa-none">
          <q-list>
            <q-item
              v-for="image in images"
              :key="image.id"
              :class="selectedAvatar === image.id ? 'bg-grey-2' : ''"
              clickable
              @click="selectImage(image)"
            >
              <q-item-section avatar>
                <q-avatar>
                  <img :src="image.dropbox_link" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ image.name }}</q-item-label>
                <q-item-label caption>{{
                  Math.ceil(image.size / 1000) + ' KB'
                }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn icon="publish" label="Upload" @click="handleUpload"></q-btn>
          <q-btn
            label="Save"
            color="primary"
            @click="handleChooseAvatar"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog> -->
  </div>
</template>

<script>
import TextInput from '@/ui/form-inputs/TextInput';
import ChooseAvatar from './ChooseAvatar';
import { GET_CURRENT_USER, GET_IMAGES } from '@/graphql/queries';

export default {
  components: {
    TextInput,
    ChooseAvatar
  },

  name: 'UpdateProfile',

  data() {
    return {
      edit: false,
      chooseAvatar: false,
      uploadAvatar: false,
      avatar: null,
      errors: [],
      name: null,
      nickname: null,
      position: null,
      contact_number: null,
      updateProfileDialog: false,
      getCurrentUser: {},
      images: [],
      selectedAvatar: null
    };
  },

  apollo: {
    getCurrentUser: {
      query: GET_CURRENT_USER,
      result({ data }) {
        const {
          name,
          nickname,
          position,
          contact_number,
          user_avatar
        } = data.getCurrentUser;
        this.name = name;
        this.nickname = nickname;
        this.position = position;
        this.contact_number = contact_number;
        this.user_avatar = user_avatar;
      }
    },

    images: {
      query: GET_IMAGES
    }
  },

  methods: {
    selectImage(image) {
      this.selectedAvatar = image.id;
    },

    showSuccessNotification() {
      this.$q.notify({
        type: 'positive',
        message: 'Success',
        position: 'bottom-right'
      });
    },

    showErrorNotification() {
      this.$q.notify({
        type: 'negative',
        message: 'An error occurred',
        position: 'bottom-right'
      });
    },

    handleChooseAvatar() {
      this.$q.loading.show();
      // implement choose avatar mutation
      this.$store
        .dispatch('profile/chooseAvatar', {
          image_id: this.selectedAvatar
        })
        .then(() => this.showSuccessNotification())
        .catch(() => this.showErrorNotification())
        .finally(() => {
          this.$q.loading.hide();
          this.chooseAvatar = false;
        });
    },

    handleReset() {
      this.name = null;
      this.nickname = null;
      this.position = null;
      this.contact_number = null;
    },

    handleFormSubmit() {
      const payload = {
        name: this.name,
        nickname: this.nickname,
        position: this.position,
        contact_number: this.contact_number
      };

      this.$q.loading.show();

      this.$store
        .dispatch('profile/updateProfile', payload)
        .then(() => {
          this.edit = false;
          this.showSuccessNotification();
        })
        .catch(() => {
          this.showErrorNotification();
        })
        .finally(() => this.$q.loading.hide());
    },

    handleUpload() {
      this.chooseAvatar = false;
      this.uploadAvatar = true;
    }
  }
};
</script>
