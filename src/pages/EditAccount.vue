<template>
  <page-container>
    <q-card class="q-mb-md">
      <q-card-section class="justify-center text-blue-grey-9">
        <div class="row justify-center text-h6 text-weight-bold">Profile</div>
        <div class="row justify-center text-caption">Add information about yourself</div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-form class="column q-gutter-md" @submit="handleSubmit">
          <text-input class="col-md-6" v-model="profileToEdit.first_name" placeholder="First Name" />
          <text-input v-model="profileToEdit.last_name" placeholder="Last Name" />
          <text-input v-model="profileToEdit.nickname" placeholder="Nickname" />
          <text-input v-model="profileToEdit.short_description" placeholder="Describe yourself briefly" type="textarea" />
          <text-input v-model="profileToEdit.position" placeholder="Position/Designation" />
          <text-input v-model="profileToEdit.contact_number" placeholder="Contact Number(s)" />
          <div class="row justify-center">
            <q-btn label="Save" color="primary" no-caps type="submit" :loading="loading" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>

    <q-card class="q-mb-md">
      <q-card-section class="justify-center text-blue-grey-9">
        <div class="row justify-center text-h6 text-weight-bold">Update Password</div>
        <div class="row justify-center text-caption">Ensure your account is using a long, random password to stay secure.</div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-form class="column q-gutter-md" @submit="updatePassword">
          <password-input v-model="old_password" placeholder="Current Password"/>
          <password-input v-model="password" placeholder="New Password"/>
          <password-input v-model="password_confirmation" placeholder="Confirm Password"/>
          <div class="row justify-center">
            <q-btn label="Save" color="primary" no-caps type="submit" :loading="loading2" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>

    <q-card class="q-mb-md">
      <q-card-section class="justify-center text-blue-grey-9">
        <div class="row justify-center text-h6 text-weight-bold">Browser Sessions</div>
        <div class="row justify-center text-caption">Manage and logout your active sessions on other browsers and devices.</div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="text-caption">
          If necessary, you may logout of all of your other browser sessions across all of your devices.
          Some of your recent sessions are listed below; however, this list may not be exhaustive.
          If you feel your account has been compromised, you should also update your password.
        </div>
        <q-form class="column q-gutter-md q-mt-sm" @submit="revokeAllTokens">
          <div class="row justify-center">
            <q-btn label="Logout Other Browser Sessions" color="primary" no-caps type="submit" :loading="loading3" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>

    <q-card>
      <q-card-section class="justify-center text-blue-grey-9">
        <div class="row justify-center text-h6 text-weight-bold">Delete Account</div>
        <div class="row justify-center text-caption">Permanently delete your account.</div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="text-caption">
          Once your account is deleted, all of its resources and data will be permanently deleted.
          Before deleting your account, please download any data or information that you wish to retain.
        </div>
        <q-form class="column q-gutter-md q-mt-sm" @submit="deleteAccount">
          <div class="row justify-center">
            <q-btn label="Delete Account" color="negative" no-caps type="submit" :loading="loading3" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </page-container>
</template>

<script>
import PageContainer from "src/ui/page/PageContainer";
import TextInput from "src/ui/form-inputs/TextInput";
import { UPDATE_PROFILE } from "src/graphql";
import { showSuccessNotification } from "src/functions";
import {authService} from "src/services";
import PasswordInput from "src/ui/form-inputs/PasswordInput";

export default {
  components: {PasswordInput, TextInput, PageContainer },
  name: 'EditAccount',
  data() {
    return {
      profileToEdit: {},
      id: null,
      old_password: null,
      password: null,
      password_confirmation: null,
      loading: false,
      loading2: false,
      loading3: false
    }
  },
  methods: {
    handleSubmit: function () {
      this.loading = true
      // handle submit
      const profileToEdit = this.profileToEdit
      delete profileToEdit.__typename
      delete profileToEdit.avatar
      this.$apollo.mutate({
        mutation: UPDATE_PROFILE,
        variables: {
          id: this.id,
          profile: {
            upsert: profileToEdit
          }
        }
      }).then(() => {
        showSuccessNotification()
        this.$store.dispatch('auth/getCurrentUser')
      })
        .catch(err => console.log(err.message))
        .finally(() => (this.loading = false))
    },
    updatePassword() {
      // TODO: implement notify user and other update password logic
      this.loading2 = true
      authService.updatePassword({
        old_password: this.old_password,
        password: this.password,
        password_confirmation: this.password_confirmation
      })
      .then(res => console.log(res))
      .catch(err => console.log(err.message))
      .finally(() => (this.loading2 = false))
    },
    revokeAllTokens() {
      authService.revokeAllTokens()
    },
    deleteAccount() {
      alert('Just kidding.')
    }
  },
  mounted() {
    this.profileToEdit = Object.assign({}, this.$store.state.auth.me.profile)
    this.id = this.$store.state.auth.me.id
  }
}
</script>
