<template>
  <page-container>
    <template v-slot:title>
      <page-title title="Banner Programs" />
    </template>

    <q-table :data="banner_programs" grid :pagination="pagination" hide-bottom>
      <template v-slot:item="props">
        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
          <q-card>
            <q-card-section class="text-center">
              <strong>{{ props.row.name }}</strong>
            </q-card-section>
            <q-separator />
            <q-card-section class="flex flex-center" :style="{ fontSize: props.row.calories + 'px' }">
              <div>{{ props.row.calories }} g</div>
            </q-card-section>
          </q-card>
        </div>
      </template>
    </q-table>
  </page-container>
</template>

<script>
  import {
    PageContainer,
    PageTitle
  } from '@/ui'
  import gql from 'graphql-tag'

  export default {
    components: {
      PageContainer,
      PageTitle
    },
    name: 'ProgramsIndex',
    apollo: {
      banner_programs: {
        query: gql`
          query {
            banner_programs {
              id
              name
              acronym
              count_prexc_activity
            }
          }
        `
      }
    },
    data() {
      return {
        banner_programs: [],
        pagination: {
          rowsPerPage: 0
        }
      }
    }
  }
</script>
