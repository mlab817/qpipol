<template>
  <page-container>
    <template v-slot:title>
      <page-title title="Banner Programs: For Consolidation" />
    </template>

    <q-table
      :data="consolidatedActivities"
      :filter="filter"
      :columns="columns"
      :loading="$apollo.loading"
      style="margin-bottom: 70px;"
      wrap-cells>
      <template v-slot:top-right="props">
        <search v-model="filter" />
        <icon-button icon="cloud_download" @click="exportForConsolidation" tooltip="Download annual data from server" />
        <icon-button icon="table_chart" @click="exportTable" tooltip="Download this table" />
        <icon-button icon="refresh" @click="refetch" />
        <fullscreen-button @click="props.toggleFullscreen" :in-fullscreen="props.inFullscreen"></fullscreen-button>
      </template>
    </q-table>
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
  data() {
    return {
      consolidatedActivities: [],
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
    }
  }
}
</script>
