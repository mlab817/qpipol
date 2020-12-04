<template>
  <page-container>
    <template v-slot:title>
      <page-title title="Projects" icon="fas fa-tasks">
        <q-btn
					outline
          :label="$q.screen.lt.md ? void 0 : 'Add Project'"
					icon="add"
          to="/projects/add"
          v-if="isEncoder"
        ></q-btn>
				<help-button @click="showHelp" />
      </page-title>
    </template>

    <q-table
      :data="filteredProjects"
      :loading="$apollo.loading"
      :columns="columns"
      :pagination="pagination"
      :filter="filter"
      :grid="$q.screen.lt.md"
      wrap-cells
      @row-click="rowClicked"
      style="margin-bottom: 70px;"
    >

      <template v-slot:top-right="props">
        <div class="row q-gutter-sm">
          <search v-model="filter"></search>

          <icon-button
						tooltip="Filter by Submission Status"
            icon="filter_alt"
            @click="filterProjects"
            :color="selected.length ? 'primary' : void 0"
          />

          <icon-button icon="refresh" tooltip="Re-download data from server" @click="refetch" />

					<icon-button icon="cloud_download" tooltip="Download data from server" @click="exportProjects" v-if="isReviewer" />

					<icon-button icon="table_chart" tooltip="Download table" @click="exportTable" />

					<fullscreen-button @click="props.toggleFullscreen" :in-fullscreen="props.inFullscreen"></fullscreen-button>
        </div>
      </template>

			<template v-slot:body-cell-pipol="props">
				<q-td :props="props">
					<q-badge label="PIPOL" v-if="props.row.pipol"></q-badge>
				</q-td>
			</template>

      <template v-slot:body-cell-submission_status="props">
        <q-td :props="props">
					<q-badge :color="getColor(props.row.submission_status)" v-if="props.row.submission_status"  @click.stop="filter = props.row.submission_status.name">
          {{
            props.row.submission_status ? props.row.submission_status.name : ''
          }}
					</q-badge>
        </q-td>
      </template>

			<template v-slot:body-cell-pipol_status="props">
				<q-td :props="props">
					<q-badge :color="getColor(props.row.pipol_status)" v-if="props.row.pipol_status">
						{{
						props.row.pipol_status ? props.row.pipol_status.name : ''
						}}
					</q-badge>
				</q-td>
			</template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
					<q-btn-dropdown color="primary" label="Menu" @click.stop>
						<project-menu :project="props.row" />
					</q-btn-dropdown>
        </q-td>
      </template>

      <template v-slot:item="props">
        <div class="q-pa-sm col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-3">
          <q-card
            class="fit q-pa-none cursor-pointer"
            :class="
              props.row.submission_status && props.row.submission_status.name === 'Finalized' ? 'bg-green' : ''
            "
						@click="openURL(`/projects/${props.row.id}`, null, {target: '_blank'})"
          >
            <q-list>
              <q-item class="q-pa-sm">
                <q-item-section>
                  <q-item-label>{{ props.row.title }}</q-item-label>
                  <q-item-label>
                    <q-badge
                      :color="
                        props.row.type && props.row.type.id === '1'
                          ? 'blue'
                          : 'negative'
                      "
                      >{{ props.row.type && props.row.type.name }}</q-badge
                    >
                    |
                    {{
                      props.row.main_funding_source
                        ? props.row.main_funding_source.name
                        : ''
                    }}
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
									<q-btn-dropdown color="primary" label="Menu" @click.stop>
										<project-menu :project="props.row" />
									</q-btn-dropdown>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label caption class="text-capitalize"
                    >{{
                      props.row.submission_status
                        ? props.row.submission_status.name
                        : ''
                    }}:</q-item-label
                  >
                  <q-item-label>
                    <q-badge color="blue">v. {{ props.row.version }}</q-badge> |
                    {{ props.row.updated_at | formatDate }}</q-item-label
                  >
                </q-item-section>
                <q-item-section side>
                  <q-item-label class="text-h6">
                    PhP {{ props.row.total_project_cost | formatMoney }}
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
import { exportFile, date, openURL } from 'quasar';
import ProjectMenu from '../components/projects/dropdowns/ProjectMenu.vue';
import PageContainer from '@/ui/page/PageContainer.vue';
import PageTitle from '@/ui/page/PageTitle.vue';
import { ALL_PROJECTS } from '@/graphql';
import { SUBMISSION_STATUSES } from '../graphql';
import { timeAgo, wrapCsvValue } from 'src/utils';

import {
	FullscreenButton,
	Search
} from '@/ui'
import IconButton from '../ui/buttons/IconButton'
import HelpButton from '../ui/buttons/HelpButton'
import {projectService} from '../services'

export default {
  components: {
	  HelpButton,
	  IconButton,
    ProjectMenu,
    PageContainer,
    PageTitle,
    Search,
	  FullscreenButton
  },

  name: 'ProjectsIndex',

  computed: {
  	isReviewer() {
  		return this.$store.getters['auth/isReviewer']
		},
    isEncoder() {
      return this.$store.getters['auth/isEncoder'];
    },
    filteredProjects() {
      const selected = this.selected;
      let filteredProjects = [];

      if (!selected.length) {
        // if nothing is selected, return all projects
        filteredProjects = this.allProjects;
      } else {
        // if something is selected, return projects that match the status
        filteredProjects = this.allProjects.filter(proj => {
          return proj.submission_status && selected.includes(proj.submission_status.id);
        });
      }

      return filteredProjects;
    }
  },

  apollo: {
    allProjects: {
      query: ALL_PROJECTS
    },
    submission_statuses: {
      query: SUBMISSION_STATUSES
    }
  },

  data() {
    return {
      filter: '',
      allProjects: [],
      processing_statuses: [],
      selected: [],
      columns: [
        {
          name: 'pipol',
          label: 'PIPOL',
					field: row => row.pipol ? 'PIPOL' : '',
					sortable: true,
          align: 'center'
        },
				{
					name: 'ou',
					label: 'Operating Unit',
					field: row => row.operating_unit && row.operating_unit.acronym,
					align: 'center',
					sortable: true
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
          field: row => (row.type ? row.type.name : 'N.S.'),
          sortable: true,
          align: 'center'
        },
	      {
		      name: 'banner_program',
		      label: 'Banner Program',
		      field: row => row.banner_program && row.banner_program.name,
		      align: 'left',
		      sortable: true
	      },
        {
          name: 'funding_source',
          label: 'Main Funding Source',
          field: row =>
            row.main_funding_source ? row.main_funding_source.name : 'N.S.',
          sortable: true,
          align: 'center'
        },
        {
          name: 'cost',
          label: 'Total Project Cost',
          field: row => row.investment_target_total,
					format: (val) => val && val.toLocaleString(),
					sortable: true
        },
				{
					name: 'prexc_activity',
					label: 'PREXC Activity',
					field: row => row.prexc_activity_id,
					format: val => val && `#${val}`,
					sortable: true
				},
        {
          name: 'created_by',
          label: 'Added By',
          field: row => (row.creator ? row.creator.nickname : ''),
	        sortable: true
        },
        {
          name: 'last_updated',
          label: 'Last Updated',
          field: row => Date.parse(row.updated_at),
          sortable: true,
          format: (val) => date.formatDate(val, 'MMM D, YYYY hh:mm A'),
          align: 'center',
          sort: (a, b) => a - b
        },
        {
          name: 'submission_status',
          label: 'Submission Status',
          field: row => row.submission_status && row.submission_status.name,
          sortable: true,
          align: 'center'
        },
	      {
		      name: 'pipol_status',
		      label: 'PIPOL Status',
		      field: row => row.pipol_status && row.pipol_status.name,
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
        rowsPerPage: 10
      }
    };
  },
  methods: {
    openURL,
    refetch() {
      this.$apollo.queries.allProjects.refetch();
    },
    rowClicked(evt, row) {
      // this.$router.push('/projects/' + row.id);
      openURL('/projects/' + row.id, null, { target: '_blank' })
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
      // transform processing statuses in label-value for options
      const items =
        this.submission_statuses.length &&
        this.submission_statuses.map(ps => {
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
    },
		showHelp() {
    	const content = 'This list contains all projects added by users associated to your operating unit.'
    	this.$q.dialog({
				title: 'Projects',
				message: content,
				html: true,
				cancel: true
			})
		},
		exportProjects() {
    	this.$q.loading.show()
    	projectService.exportProjects()
				.then(({ exportProjects }) => {
					const { link } = exportProjects
					if (!link) {
						Promise.reject({
							message: 'Failed to generate file from server'
						})
					} else {
						this.$q.dialog({
							title: 'Download File',
							message: 'Click OK to download the file',
							cancel: true
						})
						.onOk(() => {
							openURL(link, null, {
								target: '_blank'
							})
						})
					}
				})
				.catch(err => {
					this.$q.notify({
						type: 'negative',
						message: err.message
					})
				})
				.finally(() => this.$q.loading.hide())
		},
		getColor(status) {
    	const statusId = status && status.id

			switch (parseInt(statusId)) {
				case 1:
					return 'red';
					break;
				case 2:
					return 'green';
					break;
				case 3:
					return 'blue';
					break;
        case 4:
          return 'purple';
          break;
				default:
					return 'white';
			}
		}
  },
  filters: {
    formatMoney(val) {
      if (val) {
        return val.toLocaleString();
      }
      return 0.0;
    },
    formatDate(val) {
      return timeAgo(val);
    }
  }
};
</script>
