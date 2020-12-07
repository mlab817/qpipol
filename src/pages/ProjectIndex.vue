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
      </page-title>
    </template>

    <div class="row">
      <div class="col">
        <div class="row q-gutter-sm">
          <q-btn dense label="Filter" icon="filter_list" outline color="blue" @click="filter = !filter" />
          <q-select label="Order By" dense outlined v-model="sortBy" :options="orders" style="min-width: 200px;" />
        </div>
      </div>
      <div class="col">
        <div class="row justify-end text-h6 text-weight-bold">
          {{total}} results
        </div>
      </div>
    </div>

    <div class="row q-mt-sm q-col-gutter-sm">
      <div class="col-3" v-if="filter">
        <div class="row q-gutter-sm q-py-sm justify-end">
          <q-btn label="Clear Filters" color="red" size="sm" @click="clearFilters" />
          <q-btn label="Apply Filters" color="blue" size="sm" @click="applyFilters" />
        </div>
        <q-separator />
        <q-expansion-item label="PAP Types">
          <q-option-group color="secondary" :options="types" type="checkbox" v-model="selectedTypes"></q-option-group>
        </q-expansion-item>
        <q-separator/>
        <q-expansion-item label="Operating Units">
          <q-option-group color="secondary" :options="operating_units" type="checkbox" v-model="selectedOperatingUnits"></q-option-group>
        </q-expansion-item>
        <q-separator  />
        <q-expansion-item label="Banner Program">
          <q-option-group color="secondary" :options="banner_programs" type="checkbox" v-model="selectedBannerPrograms"></q-option-group>
        </q-expansion-item>
        <q-separator />
        <q-expansion-item label="Project Status">
          <q-option-group color="secondary" :options="project_statuses" type="checkbox" v-model="selectedProjectStatuses"></q-option-group>
        </q-expansion-item>
        <q-separator />
      </div>

      <div class="col">
        <q-list separator>
          <template v-if="$apollo.loading">
            <q-item v-for="i in 10" :key="i">
              <q-item-section avatar>
                <q-skeleton type="QAvatar" />
              </q-item-section>
              <q-item-section>
                <q-item-label>
                  <q-skeleton type="text" />
                </q-item-label>
                <q-item-label caption>
                  <q-skeleton type="text" width="65%" />
                </q-item-label>
                <q-item-label caption>
                  <q-skeleton type="text" width="90%" />
                </q-item-label>
                <q-item-label caption>
                  <q-skeleton type="text" width="20%" />
                </q-item-label>
              </q-item-section>
              <q-item-section side top class="col-1">
                <q-item-label>
                  <q-skeleton type="QBadge" />
                </q-item-label>
              </q-item-section>
            </q-item>
          </template>
          <template v-else>
            <template v-if="!projects.length">
              <q-banner class="bg-purple text-white">
                No projects found.
                <template v-slot:action>
                  <q-btn flat color="white" label="Add" to="/projects/add" />
                </template>
              </q-banner>
            </template>
            <q-item v-for="project in projects" :key="project.id" v-else>
              <q-item-section>
                <q-item-label class="text-weight-bold">
                  {{ project.title }}
                </q-item-label>
                <q-item-label :lines="2">
                  {{ project.description }}
                </q-item-label>
                <q-item-label caption>
                  {{ project.creator ? project.creator.name : '' }}
                </q-item-label>
                <q-item-label caption>
                  {{ project.updated_at | formatDate }}
                </q-item-label>
                <q-item-label>
                  <q-badge class="text-weight-bold" :color="getColor(project.type)" v-if="project.type">
                    {{ project.type ? project.type.name : '' }}
                  </q-badge>
                </q-item-label>
              </q-item-section>
              <q-item-section side top class="text-weight-bold">
                PhP {{ project.investment_target_total }}
              </q-item-section>
            </q-item>
          </template>
        </q-list>
      </div>
    </div>

    <div class="row justify-center q-mt-md">
      <q-pagination
        v-model="page"
        :max="lastPage"
        :boundary-links="true"
      >
      </q-pagination>
    </div>
  </page-container>
</template>

<script>
import { exportFile, openURL } from 'quasar';
import {
  PageContainer,
  PageTitle
} from 'src/ui/page';
import {
  BANNER_PROGRAMS,
  FETCH_PROJECT_STATUSES,
  FETCH_TYPES,
  PROJECTS,
  SUBMISSION_STATUSES
} from 'src/graphql';
import { timeAgo, wrapCsvValue } from 'src/utils';

import {projectService} from '../services'
import gql from "graphql-tag";

export default {
  components: {
    PageContainer,
    PageTitle
  },

  name: 'ProjectsIndex',

  computed: {
    orderBy() {
      const sortBy = this.sortBy
      const UPDATED_AT = "UPDATED_AT"
      const TITLE = "TITLE"
      const DESC = "DESC"
      const ASC = "ASC"

      switch (sortBy.toLowerCase()) {
        case 'newest':
          return [{field: UPDATED_AT, order: DESC}]
          break;
        case 'oldest':
          return [{field: UPDATED_AT, order: ASC}];
          break;
        case 'a - z':
          return [{field: UPDATED_AT, order: ASC}];
          break;
        case 'z - a':
          return [{field: TITLE, order: DESC}];
          break;
        default:
          return [{field: UPDATED_AT, order: DESC}]
      }
    },
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
        filteredProjects = this.projects;
      } else {
        // if something is selected, return projects that match the status
        filteredProjects = this.projects.filter(proj => {
          return proj.submission_status && selected.includes(proj.submission_status.id);
        });
      }

      return filteredProjects;
    },
    where() {
      const OPERATING_UNIT_ID = 'OPERATING_UNIT_ID',
        TYPE_ID = 'TYPE_ID',
        IN = 'IN',
        PROJECT_STATUS_ID = 'PROJECT_STATUS_ID',
        BANNER_PROGRAM_ID = 'BANNER_PROGRAM_ID'
      const AND = []
      if (this.selectedTypes.length) {
        AND.push(
          { column: TYPE_ID, operator: IN, value: this.selectedTypes }
        )
      }
      if (this.selectedBannerPrograms.length) {
        AND.push(
          { column: BANNER_PROGRAM_ID, operator: IN, value: this.selectedBannerPrograms }
        )
      }
      if (this.selectedOperatingUnits.length) {
        AND.push(
          { column: OPERATING_UNIT_ID, operator: IN, value: this.selectedOperatingUnits }
        )
      }
      if (this.selectedProjectStatuses.length) {
        AND.push(
          { column: PROJECT_STATUS_ID, operator: IN, value: this.selectedProjectStatuses }
        )
      }

      return { AND: AND }
    }
  },

  apollo: {
    projects: {
      query: PROJECTS,
      variables() {
        return {
          where: this.where,
          orderBy: this.orderBy,
          first: this.first,
          page: this.page
        }
      },
      result({ data }) {
        console.log(data.projects)
        this.projects = data.projects.data
        this.lastPage = data.projects.paginatorInfo.lastPage
        this.total = data.projects.paginatorInfo.total
      }
    },
    submission_statuses: {
      query: SUBMISSION_STATUSES
    },
    types: {
      query: FETCH_TYPES,
      result({data}) {
        this.types = data.types && data.types.map(x => {
          return {
            label: x.name,
            value: x.id
          }
        })
      }
    },
    banner_programs: {
      query: BANNER_PROGRAMS,
      result({data}) {
        this.banner_programs = data.banner_programs && data.banner_programs.map(x => {
          return {
            label: x.name,
            value: x.id
          }
        })
      }
    },
    project_statuses: {
      query: FETCH_PROJECT_STATUSES,
      result({data}) {
        this.project_statuses = data.project_statuses && data.project_statuses.map(x => {
          return {
            label: x.name,
            value: x.id
          }
        })
      }
    },
    operating_units: {
      query: gql`
        query {
          operating_units {
            id
            name
          }
        }
      `,
      result({data}) {
        this.operating_units = data.operating_units && data.operating_units.map(x => {
          return {
            label: x.name,
            value: x.id
          }
        })
      }
    }
  },

  data() {
    return {
      types: [],
      banner_programs: [],
      project_statuses: [],
      operating_units: [],
      selectedTypes: [],
      selectedBannerPrograms: [],
      selectedProjectStatuses: [],
      selectedOperatingUnits: [],
      page: 1,
      first: 10,
      lastPage: 1,
      sortBy: 'Newest',
      orders: [
        'Newest',
        'Oldest',
        'A - Z',
        'Z - A'
      ],
      total: 0,
      filter: true,
      pagination: {
        page: 1,
        rowsPerPage: 10,
      },
      projects: []
    };
  },
  methods: {
    openURL,
    refetch() {
      this.$apollo.queries.projects.refetch();
    },
    clearFilters() {
      this.selectedTypes = []
      this.selectedBannerPrograms = []
      this.selectedProjectStatuses = []
      this.selectedOperatingUnits = []
    },
    applyFilters() {
      const {
        selectedTypes,
        selectedBannerPrograms,
        selectedProjectStatuses,
        selectedOperatingUnits
      } = this.$data
      alert(`selectedTypes >>> ${selectedTypes},
        selectedBannerPrograms >>> ${selectedBannerPrograms},
        selectedProjectStatuses >>> ${selectedProjectStatuses},
        selectedOperatingUnits >>> ${selectedOperatingUnits}`
      )
    },
    exportTable() {
      const content = [this.columns.map(col => wrapCsvValue(col.label))]
        .concat(
          this.projects.map(row =>
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
    getColor(type) {
      const name = type ? type.name.toLowerCase() : ''
      switch (name) {
        case 'activity':
          return 'red';
          break;
        case 'program':
          return 'yellow';
          break;
        case 'ongoing project':
          return 'green';
          break;
        case 'new project':
          return 'blue';
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
  },
  mounted() {
    console.log(this.where)
  }
};
</script>
