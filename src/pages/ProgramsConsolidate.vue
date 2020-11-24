<template>
  <page-container>
    <template v-slot:title>
      <page-title icon="fas fa-layer-group" title="Banner Programs: For Consolidation" />
    </template>

    <q-table
      :data="consolidatedActivities"
      :filter="filter"
      :columns="columns"
      :loading="$apollo.loading"
      wrap-cells>
      <template v-slot:top-left>
        <div class="row">{{consolidates}}</div>
      </template>
      <template v-slot:top-right="props">
        <search v-model="filter" />
        <icon-button icon="cloud_download" @click="exportForConsolidation" tooltip="Download annual data from server" />
        <icon-button icon="table_chart" @click="exportTable" tooltip="Download this table" />
        <icon-button icon="refresh" @click="refetch" />
        <fullscreen-button @click="props.toggleFullscreen" :in-fullscreen="props.inFullscreen"></fullscreen-button>
      </template>

      <template v-slot:body-cell-submission_status="props">
        <q-td :props="props">
          <q-badge :color="getColor(props.row.submission_status)" v-if="props.row.submission_status" @click="filter = props.row.submission_status.name" class="cursor-pointer">
            {{props.row.submission_status && props.row.submission_status.name}}
          </q-badge>
        </q-td>
      </template>

      <template v-slot:bottom-row>
        <q-tr class="text-weight-bold">
          <q-td>Total</q-td>
          <q-td></q-td>
          <q-td></q-td>
          <q-td></q-td>
          <q-td class="text-right">{{ totalRow.infrastructure_target_total.toLocaleString() }}</q-td>
          <q-td class="text-right">{{ totalRow.investment_target_total.toLocaleString() }}</q-td>
          <q-td class="text-right">{{ totalRow.nep_total.toLocaleString() }}</q-td>
          <q-td class="text-right">{{ totalRow.gaa_total.toLocaleString() }}</q-td>
          <q-td class="text-right">{{ totalRow.disbursement_total.toLocaleString() }}</q-td>
        </q-tr>
      </template>
    </q-table>

    <div class="row text-caption q-mt-sm text-italic" style="margin-bottom: 70px;">
      PREXC Activities inputted in the Program Module will appear here based on the tagged
      Banner Program. PREXC Activities from the Project Module will be added here once
      they are re-tagged and duplicated by the IPD focal person.
    </div>
  </page-container>
</template>

<script>
import {
  PageContainer,
  PageTitle,
  IconButton,
  FullscreenButton,
  Search
} from '@/ui'
import {
  CONSOLIDATED_ACTIVITIES
} from '@/graphql'
import {
  wrapCsvValue
} from '@/utils'
import {
  exportFile,
  openURL
} from 'quasar'
import {
  programService
} from '@/services'


export default {
  components: {
    PageContainer,
    PageTitle,
    IconButton,
    FullscreenButton,
    Search
  },
  name: 'ProgramsConsolidate',
  apollo: {
    consolidatedActivities: {
      query: CONSOLIDATED_ACTIVITIES
    }
  },
  computed: {
    consolidates() {
      return this.$store.getters['auth/consolidates']
    },
    totalRow() {
      const activities = this.consolidatedActivities;

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
      consolidatedActivities: [],
      filter: '',
      columns: [
        // {
        //   name: 'id',
        //   label: 'ID',
        //   field: 'id',
        //   align: 'center',
        //   sortable: true
        // },
        {
          name: 'operating_unit',
          label: 'Operating Unit',
          field: row => row.operating_unit && row.operating_unit.acronym,
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
					name: 'banner_program',
					label: 'Banner Program',
					field: row => row.banner_program && row.banner_program.name,
					align: 'left',
					sortable: true
				},
        {
          name: 'activity',
          label: 'Activity',
          field: 'name',
          align: 'left',
          sortable: true
        },
        {
          name: 'infrastructure_target_total',
          label: 'Infrastructure Target',
          field: 'infrastructure_target_total',
          format: (val, row) => val && val.toLocaleString(),
          sortable: true
        },
        {
          name: 'investment_target_total',
          label: 'Total Investment Target',
          field: 'investment_target_total',
          format: (val, row) => val && val.toLocaleString(),
          sortable: true
        },
        {
          name: 'nep_total',
          label: 'National Expenditure Program',
          field: 'nep_total',
          format: (val, row) => val && val.toLocaleString(),
          sortable: true
        },
        {
          name: 'gaa_total',
          label: 'General Appropriations Act',
          field: 'gaa_total',
          format: (val, row) => val && val.toLocaleString(),
          sortable: true
        },
        {
          name: 'disbursement_total',
          label: 'Total Disbursement',
          field: 'disbursement_total',
          format: (val, row) => val && val.toLocaleString(),
          sortable: true
        },
        {
          name: 'submission_status',
          label: 'Submission Status',
          field: row => row.submission_status && row.submission_status.name,
          sortable: true,
          align: 'center'
        }
      ]
    }
  },
  methods: {
    exportTable() {
      const content = [this.columns.map(col => wrapCsvValue(col.label))]
        .concat(
          this.consolidatedActivities.map(row =>
            this.columns
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

      const status = exportFile('export.csv', content, 'text/csv');

      if (status !== true) {
        this.$q.notify({
          message: 'Browser denied file download...',
          color: 'negative',
          icon: 'warning'
        });
      }
    },
    refetch() {
      this.$apollo.queries.consolidatedActivities.refetch()
    },
    exportForConsolidation() {
      this.$q.loading.show('Generating file...')
      programService
        .exportForConsolidation()
        .then(res => {
          const { link } = res.exportForConsolidation

          if (link) {
            this.$q.dialog({
              title: 'Download File',
              message: 'Click OK to download file',
              cancel: true
            })
            .onOk(() => openURL(link, null, {
              target: '_blank'
            }))
          } else {
            Promise.reject()
          }
        })
        .catch(err => console.log(err.message))
        .finally(() => this.$q.loading.hide())
    },
    getColor(submission_status) {
      const submissionStatus = submission_status && submission_status.name

      switch (submissionStatus) {
        case 'Draft':
          return 'red';
          break;
        case 'Finalized':
          return 'primary';
          break;
        default:
          return 'white';
      }
    }
  }
}
</script>
