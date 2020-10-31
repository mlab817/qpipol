<template>
  <q-page>
    <q-item-label header>Activities</q-item-label>

    <q-list bordered separator>
      <q-item>
        <q-item-section avatar>
          ID
        </q-item-section>
        <q-item-section>
          {{ prexc_subprogram.id }}
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section avatar>
          Name
        </q-item-section>
        <q-item-section>
          {{ prexc_subprogram.name }}
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section avatar>
          Acronym
        </q-item-section>
        <q-item-section>
          {{ prexc_subprogram.acronym }}
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section avatar>
          UACS Code
        </q-item-section>
        <q-item-section>
          {{ prexc_subprogram.uacs_code }}
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section avatar>
          Organizational Outcomes
        </q-item-section>
        <q-item-section>
          {{ prexc_subprogram.organizational_outcomes }}
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section avatar>
          Objective Statement
        </q-item-section>
        <q-item-section>
          {{ prexc_subprogram.objective_statement }}
        </q-item-section>
      </q-item>
    </q-list>

    <q-item-label header>Investment Details</q-item-label>

    <q-table flat hide-bottom :data="prexc_activities" :columns="columns">
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            round
            flat
            :to="`/prexc_activities/${props.row.id}`"
            icon="send"
          ></q-btn>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { PREXC_SUBPROGRAM } from '@/graphql';

export default {
  name: 'Activities',
  props: ['id'],
  apollo: {
    prexc_subprogram: {
      query: PREXC_SUBPROGRAM,
      variables() {
        return {
          id: this.$props.id
        };
      },
      result({ data }) {
        this.prexc_activities = data.prexc_subprogram.prexc_activities;
      }
    }
  },
  data() {
    return {
      prexc_subprogram: {},
      prexc_activities: [],
      columns: [
        {
          name: 'id',
          label: 'ID',
          field: 'id'
        },
        {
          name: 'name',
          label: 'Name',
          field: 'name'
        },
        {
          name: 'acronym',
          label: 'Acronym/Short name',
          field: 'acronym'
        },
        {
          name: 'uacs_code',
          label: 'UACS Code',
          field: 'uacs_code'
        },
        {
          name: 'actions',
          label: 'Actions'
        }
      ]
    };
  },
  mounted() {
    this.id;
  }
};
</script>
