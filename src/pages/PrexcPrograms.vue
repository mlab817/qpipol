<template>
  <page-container>
    <template v-slot:title>
      <page-title title="Prexc Programs" />
    </template>

    <div class="row">
      <div class="col-3">
        <search v-model="filter" class="q-pa-xs" />

        <template v-for="pp in prexc_programs">
          <div :key="pp.id" class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-3">
            <q-card>
              <q-item class="q-pa-none bg-primary">
                <q-item-section class=" q-pa-md q-ml-none  text-white">
                  <q-item-label class="text-white text-h6 text-weight-bolder">
                    {{ pp.count_prexc_activity }}
                  </q-item-label>
                  <q-item-label :lines="1">{{ pp.name }}</q-item-label>
                </q-item-section>
                <q-item-section side class="q-mr-md text-white">
                  <q-icon name="fas fa-chart-bar" color="white" size="44px"></q-icon>
                </q-item-section>
              </q-item>
            </q-card>
          </div>
        </template>
      </div>
      <div class="col">
        <q-table :filter="filter" :data="prexc_activities" grid :pagination="pagination" hide-bottom>
          <template v-slot:top-right>
            <search v-model="filter" />
          </template>


        </q-table>
      </div>
    </div>


  </page-container>
</template>

<script>
  import {
    PageContainer,
    PageTitle,
    Search
  } from '@/ui'
  import gql from 'graphql-tag'

  export default {
    components: {
      PageContainer,
      PageTitle,
      Search
    },
    name: 'PrexcPrograms',
    apollo: {
      prexc_programs: {
        query: gql`
          query {
            prexc_programs {
              id
              name
              acronym
              count_prexc_activity
            }
          }
        `
      },
      prexc_activities: {
        query: gql`
          query ($id: ID!) {
            prexc_activities(id: $id) {
              id
            }
          }
        `
      }
    },
    data() {
      return {
        prexc_programs: [],
        pagination: {
          rowsPerPage: 0
        },
        filter: ''
      }
    }
  }
</script>
