<template>
  <page-container>
    <template v-slot:title>
      <page-title title="Programs"></page-title>
    </template>

    <q-table
      :data="prexc_programs"
      :columns="columns"
      :filter="filter"
      wrap-cells
    >
      <template v-slot:top-right>
        <div class="row">
          <q-input borderless v-model="filter"></q-input>
        </div>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            round
            flat
            :to="`programs/${props.row.id}`"
            icon="send"
          ></q-btn>
        </q-td>
      </template>
    </q-table>
  </page-container>
</template>

<script>
import PageContainer from '@/ui/page/PageContainer.vue';
import PageTitle from '@/ui/page/PageTitle.vue';
import { PREXC_PROGRAMS } from '@/graphql';

export default {
  components: { PageContainer, PageTitle },
  name: 'ProgramIndex',
  apollo: {
    prexc_programs: {
      query: PREXC_PROGRAMS
    }
  },
  data() {
    return {
      prexc_programs: [],
      filter: '',
      columns: [
        {
          name: 'id',
          label: 'ID',
          field: 'id',
          align: 'center',
          sortable: true
        },
        {
          name: 'program',
          label: 'Program',
          field: 'name',
          align: 'center',
          sortable: true
        },
        {
          name: 'cost_structure',
          label: 'Cost Structure',
          field: row => row.cost_structure && row.cost_structure.name,
          align: 'center',
          sortable: true
        },
        {
          name: 'actions',
          label: 'Actions',
          align: 'center'
        }
      ]
    };
  }
};
</script>
