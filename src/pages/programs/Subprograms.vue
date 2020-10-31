<template>
  <q-page>
    <q-item-label header>Program</q-item-label>

    <q-list bordered separator>
      <q-item>
        <q-item-section avatar>
          ID
        </q-item-section>
        <q-item-section>
          {{ prexc_program.id }}
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section avatar>
          Name
        </q-item-section>
        <q-item-section>
          {{ prexc_program.name }}
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section avatar>
          Acronym
        </q-item-section>
        <q-item-section>
          {{ prexc_program.acronym }}
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section avatar>
          UACS Code
        </q-item-section>
        <q-item-section>
          {{ prexc_program.uacs_code }}
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section avatar>
          Organizational Outcomes
        </q-item-section>
        <q-item-section>
          {{ prexc_program.organizational_outcomes }}
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section avatar>
          Objective Statement
        </q-item-section>
        <q-item-section>
          {{ prexc_program.objective_statement }}
        </q-item-section>
      </q-item>
    </q-list>

    <q-item-label header>Subprograms</q-item-label>

    <q-table
      flat
      hide-bottom
      :data="prexc_subprograms"
      :columns="columns"
      wrap-cells
    >
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
import { PREXC_PROGRAM } from '@/graphql';

export default {
  name: 'Subprograms',
  props: ['id'],
  apollo: {
    prexc_program: {
      query: PREXC_PROGRAM,
      variables() {
        return {
          id: this.$props.id
        };
      },
      result({ data }) {
        this.prexc_subprograms = data.prexc_program.prexc_subprograms;
      }
    }
  },
  data() {
    return {
      prexc_program: {},
      prexc_subprograms: [],
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
