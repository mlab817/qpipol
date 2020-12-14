<template>
  <page-container>
    <q-card square flat bordered>
      <q-card-section class="justify-center text-blue-grey-9">
        <div class="row justify-center text-h6 text-weight-bold">Profile</div>
        <div class="row justify-center text-caption">Add information about yourself</div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-form class="column q-gutter-md" @submit="handleSubmit">
          <text-input v-model="profileToEdit.first_name" placeholder="First Name" />
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
  </page-container>
</template>

<script>
import PageContainer from "src/ui/page/PageContainer";
import TextInput from "src/ui/form-inputs/TextInput";
import { UPDATE_PROFILE } from "src/graphql";
import { showSuccessNotification } from "src/functions";

export default {
  components: {TextInput, PageContainer },
  name: 'EditAccount',
  data() {
    return {
      profileToEdit: {},
      id: null,
      loading: false
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
    }
  },
  mounted() {
    this.profileToEdit = Object.assign({}, this.$store.state.auth.me.profile)
    this.id = this.$store.state.auth.me.id
  }
}
</script>
