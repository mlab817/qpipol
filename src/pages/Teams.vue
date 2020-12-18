<template>
  <q-page padding>
    <q-card class="q-mb-md">
      <q-card-section class="justify-center text-blue-grey-9">
        <div class="row justify-center text-h6 text-weight-bold">
          My Teams
        </div>
        <div class="row justify-center text-caption">
          The teams owned by user and teams the user belongs to.
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>

      </q-card-section>
    </q-card>

    <q-card class="q-mb-md">
      <q-card-section class="justify-center text-blue-grey-9">
        <div class="row justify-center text-h6 text-weight-bold">
          Add Team Member
        </div>
        <div class="row justify-center text-caption">
          Add a new team member to your team, allowing them to collaborate with you.
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="text-caption">
          Please provide the email address of the person you would like to add to this team.
          The email address must be associated with an existing account.
        </div>
        <q-form class="column q-gutter-md q-mt-md">
          <text-input v-model="email" type="email" placeholder="Email" :counter="false" />
          <q-select outlined dense v-model="role" label="Role" :options="roles" />
          <div class="row justify-center">
            <q-btn label="Add" color="primary" no-caps type="submit" :loading="loading" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import TextInput from "src/ui/form-inputs/TextInput";

export default {
  name: 'TeamsPage',
  components: { TextInput },
  data() {
    return {
      loading: false,
      email: null,
      role: null,
      roles: [
        {
          label: 'Administrator',
          value: 'admin',
          description: 'Administrator users can perform any action.'
        },
        {
          label: 'Editor',
          value: 'editor',
          description: 'Editor users have the ability to read, create, update and delete projects of other users.'
        },
        {
          label: 'Contributor',
          value: 'contributor',
          description: 'Contributor users have the ability to read, create, update and delete own projects.'
        }
      ]
    }
  }
}
</script>
