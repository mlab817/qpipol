<template>
  <div>
    <q-item class="q-pa-none">
      <q-item-section>
        <q-item-label header class="q-px-none q-pb-sm"
          >Status of Projects</q-item-label
        >
      </q-item-section>
      <q-item-section side>
        <q-btn flat round icon="refresh" dense @click="refetch"></q-btn>
      </q-item-section>
    </q-item>

    <q-card
      flat
      bordered
      square
      class="row"
      style="position: relative; min-height: 115px;"
    >
      <template v-if="$apollo.loading">
        <div
          class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12"
          v-for="i in 12"
          :key="i"
        >
          <q-card square bordered flat>
            <q-item>
              <q-item-section>
                <q-skeleton type="text" width="50%" />
              </q-item-section>
              <q-item-section avatar>
                <q-skeleton type="QAvatar" />
              </q-item-section>
            </q-item>
          </q-card>
        </div>
      </template>
      <template v-else>
        <div
          class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12"
          v-for="{ id, name, count_projects } in processing_statuses"
          :key="id"
        >
          <q-card square bordered flat>
            <q-item>
              <q-item-section>
                <q-item-label class="text-uppercase">{{ name }}</q-item-label>
              </q-item-section>
              <q-item-section avatar>
                <q-avatar class="bg-grey-8 text-white">
                  {{ count_projects }}
                </q-avatar>
              </q-item-section>
            </q-item>
          </q-card>
        </div>
      </template>
    </q-card>
  </div>
</template>

<script>
import { PROCESSING_STATUSES } from '@/graphql';

export default {
  name: 'ProcessingStatuses',
  apollo: {
    processing_statuses: {
      query: PROCESSING_STATUSES
    }
  },
  data() {
    return {
      processing_statuses: []
    };
  },
  methods: {
    refetch() {
      this.$apollo.queries.processing_statuses.refetch();
    }
  }
};
</script>
