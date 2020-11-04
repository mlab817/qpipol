<template>
  <page-container>
    <template v-slot:title>
      <page-title title="Trash" icon="delete" />
    </template>

    <q-table
      :data="allProjects"
      :loading="$apollo.loading"
      :columns="columns"
      :pagination="pagination"
      :filter="filter"
      :grid="$q.screen.lt.md"
      wrap-cells
      style="margin-bottom: 70px;"
    >
      <template v-slot:top-right="props">
        <div class="row q-gutter-sm">
          <q-input
            v-model="filter"
            dense
            borderless
            placeholder="Search..."
            clearable
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>

          <q-btn flat round icon="refresh" @click="refetch">
            <q-tooltip>Refetch projects</q-tooltip>
          </q-btn>

          <q-btn flat round icon="archive" @click="exportTable">
            <q-tooltip>Download</q-tooltip>
          </q-btn>

          <q-btn
            flat
            round
            dense
            :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen"
          >
            <q-tooltip>Enter fullscreen mode</q-tooltip>
          </q-btn>
        </div>
      </template>

      <template v-slot:body-cell-avatar="props">
        <q-td :props="props">
          <q-avatar color="grey-3">
            <q-img :src="props.row.operating_unit.image" />
          </q-avatar>
        </q-td>
      </template>

      <template v-slot:body-cell-type="props">
        <q-td :props="props">
          <q-badge
            :color="props.row.type.name === 'Program' ? 'blue' : 'negative'"
            >{{ props.row.type.name }}</q-badge
          >
        </q-td>
      </template>

      <template v-slot:body-cell-last_updated="props">
        <q-td :props="props">
          {{ props.row.updatedAt | formatDate }}
        </q-td>
      </template>

      <template v-slot:body-cell-processing_status="props">
        <q-td :props="props">
          {{ props.row.processing_status.name }}
        </q-td>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="text-center">
          <q-btn
            flat
            round
            icon="restore"
            @click.stop="promptRestore(props.row)"
          ></q-btn>
          <q-btn
            flat
            round
            icon="delete"
            color="negative"
            @click.stop="promptDelete(props.row)"
          ></q-btn>
        </q-td>
      </template>

      <template v-slot:item="props">
        <div class="q-pa-sm col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-3">
          <q-card class="fit q-pa-none">
            <q-list>
              <q-item class="q-pa-sm">
                <q-item-section avatar>
                  <q-avatar color="grey-3">
                    <img :src="props.row.operating_unit.image" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ props.row.title }}</q-item-label>
                  <q-item-label>
                    <q-badge
                      :color="
                        props.row.type.name === 'Program' ? 'blue' : 'negative'
                      "
                      >{{ props.row.type.name }}</q-badge
                    >
                    |
                    {{ props.row.main_funding_source.name }}
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-btn
                    flat
                    round
                    icon="restore"
                    @click="promptRestore(props.row)"
                  >
                  </q-btn>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label caption class="text-capitalize"
                    >{{ props.row.processing_status.name }}:</q-item-label
                  >
                  <q-item-label>{{
                    props.row.updatedAt | formatDate
                  }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label class="text-h6">
                    PhP {{ props.row.total_project_cost.toLocaleString() }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </div>
      </template>
    </q-table>
  </page-container>
</template>

<script>
import PageContainer from '@/ui/page/PageContainer';
import PageTitle from '@/ui/page/PageTitle';
import { DELETED_PROJECTS_QUERY } from '@/graphql';
import { wrapCsvValue, timeAgo } from '@/utils';
import { exportFile } from 'quasar';

export default {
  components: {
    PageContainer,
    PageTitle
  },
  name: 'PageDeletedProjects',
  apollo: {
    allProjects: {
      query: DELETED_PROJECTS_QUERY
    }
  },
  data() {
    return {
      allProjects: [],
      filter: '',
      columns: [
        {
          name: 'avatar',
          label: '',
          align: 'center'
        },
        {
          name: 'title',
          label: 'PAP Title',
          field: row => row.title,
          sortable: true,
          align: 'left'
        },
        {
          name: 'type',
          label: 'PAP Type',
          field: row => (row.type ? row.type.name : ''),
          sortable: true,
          align: 'center'
        },
        {
          name: 'funding_source',
          label: 'Main Funding Source',
          field: row => row.main_funding_source.name,
          sortable: true,
          align: 'center'
        },
        {
          name: 'cost',
          label: 'Total Project Cost',
          field: row => row.total_project_cost.toLocaleString()
        },
        {
          name: 'updated_by',
          label: 'Updated By',
          field: row => (row.creator ? row.creator.nickname : '')
        },
        {
          name: 'last_updated',
          label: 'Last Updated',
          field: row => row.updatedAt,
          sortable: true,
          align: 'center'
        },
        {
          name: 'processing_status',
          label: 'Processing Status',
          field: row =>
            row.processing_status ? row.processing_status.name : '',
          sortable: true,
          align: 'center'
        },
        {
          name: 'actions',
          label: 'Actions',
          align: 'center'
        }
      ],
      pagination: {
        rowsPerPage: 0
      }
    };
  },
  methods: {
    refetch() {
      this.$apollo.queries.allProjects.refetch();
    },
    promptDelete(row) {
      this.$q
        .dialog({
          title: 'Permanently Delete',
          message: `Are you sure you want to permanently delete this project: <strong>${row.title}</strong>? Note that this project will no longer be retrieved if you do so. <br/> <br/> Type <strong>YES</strong> to confirm.`,
          html: true,
          cancel: true,
          prompt: {
            model: '',
            isValid: val => val && val.toLowerCase() === 'yes'
          }
        })
        .onOk(() => {
          this.$store.dispatch('projects/forceDelete', row.id);
        });
    },
    promptRestore(row) {
      this.$q
        .dialog({
          title: 'Restore Project',
          message: `Are you sure you want to restore this project: <strong>${row.title}</strong>?`,
          cancel: true,
          html: true
        })
        .onOk(() => this.$store.dispatch('projects/restoreProject', row.id));
    },
    exportTable() {
      const content = [this.columns.map(col => wrapCsvValue(col.label))]
        .concat(
          this.allProjects.map(row =>
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
    filterProjects() {
      const processing_statuses = this.processing_statuses;

      // transform processing statuses in label-value for options
      const items = processing_statuses.map(ps => {
        return {
          value: ps.id,
          label: ps.name
        };
      });

      // call dialog to select statuses
      this.$q
        .dialog({
          title: 'Filter By Status',
          message: 'Select as many as applicable or none to select all',
          cancel: true,
          options: {
            type: 'checkbox',
            model: this.selected,
            items: items
          }
        })
        .onOk(selected => {
          this.selected = selected;
        });
    }
  },
  filters: {
    formatDate(val) {
      return timeAgo(val);
    }
  }
};
</script>

<style></style>
