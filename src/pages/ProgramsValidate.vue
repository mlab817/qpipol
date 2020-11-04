<template>
  <page-container>
    <template v-slot:title>
      <page-title title="Review Programs"></page-title>
    </template>

    <div class="text-h6" v-if="$apollo.loading">
      Loading...
    </div>

    <q-dialog
      v-model="addEditPrexcActivityDialog"
      maximized
      persistent
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <prexc-activity
        :prexc_programs="prexc_programs"
        :prexc_subprograms="prexc_subprograms"
        :id="prexc_activity_id"
        @close="addEditPrexcActivityDialog = false"
      ></prexc-activity>
    </q-dialog>

    <q-dialog
      v-model="viewPrexcActivityDialog"
      maximized
      persistent
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <view-activity
        :id="prexc_activity_id"
        @close="addEditPrexcActivityDialog = false"
      ></view-activity>
    </q-dialog>

    <q-table
      :title="`Programs: ${operating_unit.acronym}`"
      :data="prexc_activities"
      :columns="columns"
      :loading="$apollo.loading"
      :filter="filter"
      wrap-cells
      separator="cell"
      row-key="id"
      :selected.sync="selected"
      selection="multiple"
      style="margin-bottom: 70px;"
    >
      <template v-slot:top-right>
        <q-input borderless v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn
          flat
          round
          icon="check"
          @click="reviewPrexcActivities"
          :disabled="!selected.length"
        >
          <q-tooltip>Finalize multiple activities at once</q-tooltip>
        </q-btn>
        <q-btn flat round icon="refresh" @click="refetch"></q-btn>
        <q-btn flat round icon="archive" @click="download"></q-btn>
      </template>

      <template v-slot:body-selection="scope">
        <q-checkbox v-if="!scope.row.finalized" v-model="scope.selected" />
      </template>

      <template v-slot:body-cell="props">
        <q-td
          :props="props"
          :class="
            props.row.finalized
              ? 'bg-green-2 text-black'
              : 'bg-white text-black'
          "
        >
          {{ props.value }}
        </q-td>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            icon="visibility"
            flat
            round
            size="sm"
            @click="viewPrexcActivity(props.row.id)"
          ></q-btn>

          <q-btn
            icon="edit"
            flat
            round
            size="sm"
            v-if="props.row.project_id"
            :disabled="props.row.finalized"
            :to="`/projects/${props.row.project_id}`"
          ></q-btn>

          <q-btn
            icon="edit"
            flat
            round
            size="sm"
            @click="editPrexcActivity(props.row.id)"
            :disabled="props.row.finalized"
            v-else
          ></q-btn>
        </q-td>
      </template>

      <template v-slot:bottom-row v-if="operating_unit.prexc_activities.length">
        <q-tr class="text-weight-bold">
          <q-td>TOTAL</q-td>
          <q-td></q-td>
          <q-td></q-td>
          <q-td></q-td>
          <q-td class="text-right">{{
            totalRow.infrastructure_target_total
          }}</q-td>
          <q-td class="text-right">{{ totalRow.investment_target_total }}</q-td>
          <q-td class="text-right">{{ totalRow.gaa_total }}</q-td>
          <q-td class="text-right">{{ totalRow.nep_total }}</q-td>
          <q-td class="text-right">{{ totalRow.disbursement_total }}</q-td>
          <q-td></q-td>
        </q-tr>
      </template>
    </q-table>
  </page-container>
</template>

<script>
import { PREXC_PROGRAMS, PREXC_SUBPROGRAMS } from '@/graphql';
import PageContainer from '@/ui/page/PageContainer.vue';
import PageTitle from '@/ui/page/PageTitle.vue';
import PrexcActivity from '@/components/programs/PrexcActivity.vue';
import ViewActivity from '@/components/programs/ViewActivity.vue';
import { wrapCsvValue } from 'src/utils';
import { exportFile } from 'quasar';
import gql from 'graphql-tag';

export default {
  components: { PageContainer, PageTitle, PrexcActivity, ViewActivity },
  name: 'PrexcActivities',
  apollo: {
    prexc_programs: {
      query: PREXC_PROGRAMS
    },
    prexc_subprograms: {
      query: PREXC_SUBPROGRAMS
    },
    operating_unit: {
      query: gql`
        query($id: ID!) {
          operating_unit(id: $id) {
            id
            name
            acronym
            prexc_activities {
              id
              prexc_program {
                id
                name
              }
              prexc_subprogram {
                id
                name
              }
              project_id
              infrastructure_target_total
              investment_target_total
              gaa_total
              nep_total
              disbursement_total
            }
          }
        }
      `,
      variables() {
        return {
          id: this.$route.params.id
        };
      },
      result({ data }) {
        this.prexc_activities = data.operating_unit.prexc_activities;
      }
    }
  },
  computed: {
    totalRow() {
      const activities = this.prexc_activities;

      let arraySum = {
        infrastructure_target_total: 0,
        investment_target_total: 0,
        gaa_total: 0,
        nep_total: 0,
        disbursement_total: 0
      };

      arraySum = activities.reduce((prev, cur) => {
        arraySum.infrastructure_target_total +=
          parseFloat(cur.infrastructure_target_total) || 0;
        arraySum.investment_target_total +=
          parseFloat(cur.investment_target_total) || 0;
        arraySum.gaa_total += parseFloat(cur.gaa_total) || 0;
        arraySum.nep_total += parseFloat(cur.nep_total) || 0;
        arraySum.disbursement_total += parseFloat(cur.disbursement_total) || 0;
        return arraySum;
      }, arraySum);

      return arraySum;
    }
  },
  data() {
    return {
      helpDialog: false,
      filter: '',
      getCurrentUser: {},
      prexc_programs: [],
      prexc_subprograms: [],
      prexc_activities: [],
      addEditPrexcActivityDialog: false,
      columns: [
        // {
        //   name: 'id',
        //   label: 'ID',
        //   field: 'id',
        //   align: 'center',
        //   sortable: true
        // },
        {
          name: 'prexc_program',
          label: 'Program',
          field: row => row.prexc_program && row.prexc_program.name,
          align: 'left',
          sortable: true
        },
        {
          name: 'prexc_subprogram',
          label: 'Subprogram',
          field: row => row.prexc_subprogram && row.prexc_subprogram.name,
          align: 'left',
          sortable: true
        },
        {
          name: 'prexc_activity',
          label: 'Activity',
          field: row => row.name,
          align: 'left',
          sortable: true
        },
        {
          name: 'infrastructure_target_total',
          label: 'Infrastructure Investment (PhP)',
          field: row => row.infrastructure_target_total,
          align: 'right',
          sortable: true
        },
        {
          name: 'investment_target_total',
          label: 'Total Investment (PhP)',
          field: row => row.investment_target_total,
          align: 'right',
          sortable: true
        },
        {
          name: 'gaa_total',
          label: 'General Appropriations Act (PhP)',
          field: row => row.gaa_total,
          align: 'right',
          sortable: true
        },
        {
          name: 'nep_total',
          label: 'National Expenditure Program (PhP)',
          field: row => row.nep_total,
          align: 'right',
          sortable: true
        },
        {
          name: 'disbursement_total',
          label: 'Actual Disbursement (PhP)',
          field: row => row.disbursement_total,
          align: 'right',
          sortable: true
        },
        {
          name: 'actions',
          label: 'Actions'
        }
      ],
      prexc_activity_id: null,
      operating_unit_id: null,
      selected: [],
      viewPrexcActivityDialog: false
    };
  },
  methods: {
    viewPrexcActivity(id) {
      this.prexc_activity_id = id;

      this.viewPrexcActivityDialog = true;
    },
    editPrexcActivity(id) {
      this.prexc_activity_id = id;

      this.addEditPrexcActivityDialog = true;
    },
    addPrexcActivity() {
      this.prexc_activity_id = null;

      this.addEditPrexcActivityDialog = true;
    },
    refetch() {
      this.$apollo.queries.operating_unit.refetch();
    },
    download() {
      const columns = this.columns.filter(
        x => x.name !== 'actions' && x.name !== 'id'
      );
      const content = [columns.map(col => wrapCsvValue(col.label))]
        .concat(
          this.prexc_activities.map(row =>
            columns
              .map(col =>
                wrapCsvValue(
                  typeof col.field === 'function'
                    ? col.field(row)
                    : row[col.field === void 0 ? col.name : col.field],
                  col.format
                )
              )
              .join(',')
          )
        )
        .join('\r\n');

      const status = exportFile('prexc-activities.csv', content, 'text/csv');

      if (status !== true) {
        this.$q.notify({
          message: 'Browser denied file download...',
          color: 'negative',
          icon: 'warning'
        });
      }
    },
    reviewPrexcActivities() {
      console.log('review activities');
    }
  }
};
</script>
