<template>
  <page-container>
    <template v-slot:title>
      <page-title title="Review">
        <q-btn flat round icon="refresh" @click="refetch" />
      </page-title>
    </template>
    <q-table
      v-if="getCurrentUser.reviews.length"
      grid
      :data="getCurrentUser.reviews"
      :filter="filter"
      :pagination="pagination"
      hide-bottom
    >
      <template v-slot:top-right>
        <q-input v-model="filter" placeholder="Search" borderless>
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:item="props">
        <div
          class="q-pa-xs col-xs-12 col-sm-6 col-md-3 col-lg-3 grid-style-transition"
          :style="props.selected ? 'transform: scale(0.95);' : ''"
        >
          <q-card>
            <q-list>
              <q-item :to="`/programs/${props.row.id}`">
                <q-item-section avatar>
                  <q-avatar>
                    <img :src="props.row.image_url" :alt="props.row.acronym" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ props.row.name }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </div>
      </template>
    </q-table>
    <q-banner class="bg-grey-3" v-else>
      <template v-slot:avatar>
        <q-icon name="warning" color="negative" />
      </template>
      You have no assigned operating unit to review yet. Try refreshing the page
      for updates. Otherwise, notify the admin.
      <template v-slot:action>
        <q-btn flat color="negative" label="REFRESH" @click="refetch" />
      </template>
    </q-banner>
  </page-container>
</template>

<script>
import gql from 'graphql-tag';
import PageContainer from '@/ui/page/PageContainer';
import PageTitle from '@/ui/page/PageTitle';

export default {
  components: {
    'page-container': PageContainer,
    'page-title': PageTitle
  },
  name: 'PageReview',
  apollo: {
    getCurrentUser: {
      query: gql`
        query {
          getCurrentUser {
            id
            reviews {
              id
              name
              acronym
              image_url
            }
          }
        }
      `
    }
  },
  data() {
    return {
      getCurrentUser: {},
      filter: null,
      pagination: {
        rowsPerPage: 0
      }
    };
  },
  methods: {
    refetch() {
      this.$apollo.queries.getCurrentUser.refetch();
    }
  },
  mounted() {
    this.$apollo.queries.getCurrentUser.refetch();
  }
};
</script>
