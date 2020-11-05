<template>
  <page-container>
    <template v-slot:title>
      <page-title title="Projects" icon="apps">
        <q-btn
          label="Add New"
          color="primary"
          to="/projects/add"
          v-if="isEncoder"
        ></q-btn>
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
      <template v-slot:top-left>
        <div class="row text-caption">
          {{ lastUpdated ? `Last updated on ${lastUpdated}` : null }}
        </div>
      </template>

      <template v-slot:top-right="props">
        <div class="row q-gutter-sm">
          <search v-model="filter"></search>

          <q-btn
            flat
            round
            icon="filter_alt"
            @click="filterProjects"
            :color="selected.length ? 'primary' : void 0"
          >
            <q-tooltip>Filter</q-tooltip>
          </q-btn>

          <refresh-button @click="refetch"></refresh-button>

          <download-button @click="exportTable"></download-button>

					<fullscreen-button @click="props.toggleFullscreen" :in-fullscreen="props.inFullscreen"></fullscreen-button>
        </div>
      </template>

      <template v-slot:body-cell-avatar="props">
        <q-td :props="props">
          <q-avatar color="grey-3">
            <img
              :src="
                props.row.operating_unit && props.row.operating_unit.image_url
              "
            />
          </q-avatar>
        </q-td>
      </template>

      <template v-slot:body-cell-type="props">
        <q-td :props="props">
          <q-badge
            :color="
              props.row.type && props.row.type.name === 'Program'
                ? 'blue'
                : 'negative'
            "
            >{{ props.row.type ? props.row.type.name : '' }}</q-badge
          >
        </q-td>
      </template>

      <template v-slot:body-cell-last_updated="props">
        <q-td :props="props">
          {{ props.row.updated_at | formatDate }}
        </q-td>
      </template>

      <template v-slot:body-cell-processing_status="props">
        <q-td :props="props">
          {{
            props.row.submission_status ? props.row.submission_status.name : ''
          }}
        </q-td>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn flat round icon="more_vert" @click.stop>
            <q-menu
              transition-show="jump-down"
              transition-hide="jump-up"
              auto-close
              :offset="[0, 15]"
              square
            >
              <project-menu
                :owner="props.row.created_by"
                :id="props.row.id"
                :status="props.row.submission_status ? props.row.submission_status.name : ''"
								:signed-copy="props.row.signed_copy_link"
              ></project-menu>
            </q-menu>
          </q-btn>
        </q-td>
      </template>

      <template v-slot:item="props">
        <div class="q-pa-sm col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-3">
          <q-card
            class="fit q-pa-none"
            :class="
              props.row.submission_status && props.row.submission_status.name === 'Finalized' ? 'bg-green' : ''
            "
          >
            <q-list>
              <q-item class="q-pa-sm">
                <q-item-section avatar>
                  <q-avatar color="grey-3">
                    <img
                      :src="props.row.operating_unit && props.row.operating_unit.image_url"
                      :alt="props.row.operating_unit && props.row.operating_unit.acronym"
                    />
                  </q-avatar>
                </q-item-section>
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
                  <q-btn flat round icon="more_vert">
                    <q-menu
                      transition-show="jump-down"
                      transition-hide="jump-up"
                      auto-close
                      :offset="[0, 15]"
                      square
                    >
                      <project-menu
                        :owner-id="props.row.creator ? props.row.creator.id : 0"
                        :id="props.row.id"
                        :status="
                          props.row.submission_status
                            ? props.row.submission_status.name
                            : 'draft'
                        "
                        :finalized="!!props.row.finalized"
                      ></project-menu>
                    </q-menu>
                  </q-btn>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label caption class="text-capitalize"
                    >{{
                      props.row.processing_status
                        ? props.row.processing_status.name
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
import { exportFile, LocalStorage, date } from 'quasar';
import ProjectMenu from '../components/projects/dropdowns/ProjectMenu.vue';
import PageContainer from '@/ui/page/PageContainer.vue';
import PageTitle from '@/ui/page/PageTitle.vue';
import { ALL_PROJECTS } from '@/graphql';
import { SUBMISSION_STATUSES } from '../graphql';
import { timeAgo, wrapCsvValue } from 'src/utils';

import {
	FullscreenButton,
	RefreshButton,
	DownloadButton,
	Search
} from '@/ui'

export default {
  components: {
    ProjectMenu,
    PageContainer,
    PageTitle,
    DownloadButton,
    RefreshButton,
    Search,
	  FullscreenButton
  },

  name: 'ProjectsIndex',

  computed: {
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
      query: ALL_PROJECTS,
      result() {
        const now = Date.now();
        const dateNow = date.formatDate(now, 'MMM D YYYY / HH:mm:ss A');
        LocalStorage.set('lastUpdated', dateNow);
        this.lastUpdated = dateNow;
      }
    },
    submission_statuses: {
      query: SUBMISSION_STATUSES
    }
  },

  data() {
    return {
      lastUpdated: LocalStorage.getItem('lastUpdated') || null,
      filter: '',
      allProjects: [],
      processing_statuses: [],
      selected: [],
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
          field: row =>
            row.main_funding_source ? row.main_funding_source.name : '',
          sortable: true,
          align: 'center'
        },
        {
          name: 'cost',
          label: 'Total Project Cost',
          field: row => row.investment_target_total,
					format: (val) => val.toLocaleString()
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
          name: 'submission_status',
          label: 'Submission Status',
          field: row => row.submission_status && row.submission_status.name,
          sortable: true,
          align: 'center'
        },
        {
          name: 'version',
          label: 'Version',
          field: row => row.version,
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
    rowClicked(evt, row) {
      console.log(row.id);
      this.$router.push('/projects/' + row.id);
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
