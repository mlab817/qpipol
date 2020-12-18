<template>
  <q-page class="q-pa-sm">
    <q-table
      class="col"
      :data="users"
      :filter="search"
      :pagination="pagination"
      hide-bottom
      grid
      :loading="$apollo.loading">
      <template v-slot:top>
        <q-input v-model="search" filled square placeholder="Search users..." class="col q-ma-none" />
      </template>
      <template v-slot:item="props">
        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-3 col-lg-3 grid-style-transition">
          <q-card bordered class="cursor-pointer" @click.stop="viewProjects(props.row.slug)">
            <q-card-section class="text-center">
              <q-avatar size="100px" class="shadow-5">
                <img :src="`https://robohash.org/${props.row.email}.png?set=set4`">
              </q-avatar>
            </q-card-section>

            <q-card-section class="q-pt-none text-center ">
              <div class="text-grey-8">
                {{ props.row.name }}
              </div>
              <div class="text-caption text-grey-8">
                @{{ props.row.username }}
              </div>
            </q-card-section>

            <q-card-actions align="center">
              <q-btn flat round icon="fab fa-google" class="bg-primary text-white" @click.stop="sendEmail(props.row.email)" />
              <q-btn flat round icon="fab fa-discord" class="bg-blue-grey-5 text-white" @click.stop="confirmVisitDiscord(props.row.discord_private_id)" />
            </q-card-actions>
          </q-card>
        </div>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { User } from "src/graphql";
import { openURL } from "quasar";

export default {
  name: 'UserPage',
  apollo: {
    users: {
      query: User
    }
  },
  data() {
    return {
      users: [],
      search: '',
      pagination: {
        rowsPerPage: 0
      }
    }
  },
  methods: {
    viewProjects(slug) {
      this.$router.push(`/users/${slug}/projects`)
    },
    sendEmail(email) {
      this.$q.dialog({
        title: 'Send Email',
        message: `Input your message below (at least 50 characters). This will be sent to <strong>${email}</strong>.`,
        html: true,
        prompt: {
          model: '',
          type: 'textarea',
          isValid: val => val && val.length > 50,
          counter: true
        },
        cancel: true
      }).onOk(message => {
        // TODO: Send message here
      })
    },
    confirmVisitDiscord(discordId) {
      if (!discordId) {
        alert('This user has not connected to Discord yet.')
        return
      }

      this.$q.dialog({
        title: 'Open Discord',
        message: 'This will take you to the discord application',
        cancel: true
      }).onOk(() => openURL(`https://discord.com/channels/@me/${discordId}`, null, {
        target: '_blank'
      }))
    }
  }
}
</script>
