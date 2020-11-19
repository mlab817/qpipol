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
					<search v-model="filter" />

					<icon-button icon="refresh" tooltip="Re-download Data from server" @click="refetch" />

					<icon-button icon="archive" tooltip="Download this table" @click="exportTable" />

					<fullscreen-button @click="props.toggleFullscreen" :in-fullscreen="props.inFullscreen"></fullscreen-button>
        </div>
      </template>

      <template v-slot:body-cell-avatar="props">
        <q-td :props="props">
          <q-avatar color="grey-3">
            <q-img :src="props.row.submission_status ? props.row.submission_status.name: '' " />
          </q-avatar>
        </q-td>
      </template>

      <template v-slot:body-cell-type="props">
        <q-td :props="props">
          <q-badge
            :color="props.row.type && props.row.type.name === '1' ? 'blue' : 'negative'"
            >{{ props.row.type && props.row.type.name }}</q-badge
          >
        </q-td>
      </template>

      <template v-slot:body-cell-last_updated="props">
        <q-td :props="props">
          {{ props.row.deleted_at | formatDate }}
        </q-td>
      </template>

      <template v-slot:body-cell-processing_status="props">
        <q-td :props="props">
          {{ props.row.submission_status && props.row.submission_status .name }}
        </q-td>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="text-center">
					<q-btn-dropdown color="primary" label="Menu" @click.stop>
						<q-list>
							<q-item clickable @click.stop="promptRestore(props.row)">
								<q-item-section avatar>
									<q-avatar>
										<q-icon name="restore_from_trash" />
									</q-avatar>
								</q-item-section>
								<q-item-section>
									Restore Project
								</q-item-section>
							</q-item>
							<q-item clickable @click.stop="promptDelete(props.row)">
								<q-item-section avatar>
									<q-avatar>
										<q-icon name="delete" />
									</q-avatar>
								</q-item-section>
								<q-item-section>
									Permanent Delete
								</q-item-section>
							</q-item>
						</q-list>
					</q-btn-dropdown>
        </q-td>
      </template>

      <template v-slot:item="props">
        <div class="q-pa-sm col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-3">
          <q-card class="fit q-pa-none">
            <q-list>
              <q-item class="q-pa-sm">
                <q-item-section avatar>
                  <q-avatar color="grey-3">
                    <img :src="props.row.operating_unit.image_url" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ props.row.title }}</q-item-label>
                  <q-item-label>
                    <q-badge
                      :color="
                        props.row.type && props.row.type.id === '1' ? 'blue' : 'negative'
                      "
                      >{{ props.row.type && props.row.type.name }}</q-badge
                    >
                    |
                    {{ props.row.main_funding_source && props.row.main_funding_source.name }}
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
									<q-btn-dropdown color="primary" label="Menu" @click.stop>
										<q-list>
											<q-item clickable @click.stop="promptRestore(props.row)">
												<q-item-section avatar>
													<q-avatar>
														<q-icon name="restore_from_trash" />
													</q-avatar>
												</q-item-section>
												<q-item-section>
													Restore Project
												</q-item-section>
											</q-item>
											<q-item clickable @click.stop="promptDelete(props.row)">
												<q-item-section avatar>
													<q-avatar>
														<q-icon name="delete" />
													</q-avatar>
												</q-item-section>
												<q-item-section>
													Permanent Delete
												</q-item-section>
											</q-item>
										</q-list>
									</q-btn-dropdown>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label caption class="text-capitalize"
                    >{{ props.row.submission_status && props.row.submission_status.name }}:</q-item-label
                  >
                  <q-item-label>{{
                    props.row.deleted_at | formatDate
                  }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label class="text-h6">
                    PhP {{ props.row.investment_target_total }}
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
import {
	PageContainer,
	PageTitle,
	FullscreenButton,
	IconButton,
	Search
} from '@/ui';
import { DELETED_PROJECTS_QUERY } from '@/graphql';
import { wrapCsvValue, timeAgo } from '@/utils';
import { exportFile, date, LocalStorage } from 'quasar';

export default {
  components: {
	  IconButton,
	  FullscreenButton,
	  Search,
    PageContainer,
    PageTitle
  },
  name: 'PageDeletedProjects',
  apollo: {
    allProjects: {
      query: DELETED_PROJECTS_QUERY,
	    result() {
		    const now = Date.now();
		    const dateNow = date.formatDate(now, 'MMM D YYYY / HH:mm:ss A');
		    LocalStorage.set('lastDeleteProjectsUpdated', dateNow);
		    this.lastDeleteProjectsUpdated = dateNow;
	    }
    }
  },
  data() {
    return {
	    lastDeleteProjectsUpdated: LocalStorage.getItem('lastDeleteProjectsUpdated') || null,
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
          field: row => row.main_funding_source && row.main_funding_source.name,
          sortable: true,
          align: 'center'
        },
        {
          name: 'cost',
          label: 'Total Project Cost',
          field: row => row.investment_target_total && row.investment_target_total.toLocaleString()
        },
        {
          name: 'updated_by',
          label: 'Updated By',
          field: row => (row.creator ? row.creator.nickname : '')
        },
        {
          name: 'deleted_at',
          label: 'Delete on',
          field: row => row.deleted_at,
          sortable: true,
          align: 'center'
        },
        {
          name: 'submission_status',
          label: 'Processing Status',
          field: row =>
            row.submission_status ? row.submission_status.name : '',
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
