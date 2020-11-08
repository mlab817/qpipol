<template>
  <page-container>
    <template v-slot:title>
      <page-title title="Programs" icon="view_module">
        <q-btn outline v-if="!isAc && !isAa" icon="add" label="Add Activity" @click="addPrexcActivity" class="q-mr-sm" />
        <q-btn outline v-if="!isAc && !isAa" icon="publish" label="Upload" to="/upload" class="q-mr-sm" />
				<help-button @click="helpDialog = true" />
      </page-title>
    </template>

    <q-banner v-if="isAc || isAa" class="bg-grey-3 text-accent q-my-md">
      <template v-slot:avatar>
        <q-icon name="priority_high" />
      </template>
      For attached agencies and attached corporations, please use the Add Project and Projects Module to add your PAPs.
      <template v-slot:action>
        <q-btn flat to="/projects/add" label="Add Project" />
        <q-btn flat to="/projects" label="Projects" />
      </template>
    </q-banner>

    <q-dialog v-model="helpDialog">
      <q-card>
        <q-bar class="bg-accent text-white">
          <div>Help</div>
          <q-space />
          <q-btn flat round icon="close" v-close-popup />
        </q-bar>
        <q-card-section>
          <p v-for="(help, index) in helps" :key="index">{{help}}</p>
        </q-card-section>
      </q-card>
    </q-dialog>

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
        :edit-mode="true"
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
        :prexc_programs="prexc_programs"
        :prexc_subprograms="prexc_subprograms"
        :id="prexc_activity_id"
        :edit-mode="false"
        @close="addEditPrexcActivityDialog = false"
      ></view-activity>
    </q-dialog>

    <q-table
      title="Programs"
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
       v-if="!isAc && !isAa"
    >
			<template v-slot:top-left>
				<div class="row text-caption">
					{{ lastUpdatedPrograms ? `Last downloaded on ${lastUpdatedPrograms}` : null }}
				</div>
			</template>

      <template v-slot:top-right="props">
				<search v-model="filter" />

				<icon-button icon="done_all" @click="finalizePrexcActivities" tooltip="Finalize multiple activities at once" />

				<icon-button icon="refresh" tooltip="Re-download from server" @click="refetch" />

				<icon-button icon="cloud_download" tooltip="Download with annual data" @click="exportExcel" />

				<icon-button icon="table_chart" tooltip="Download this table" @click="download" />

				<fullscreen-button @click="props.toggleFullscreen" :in-fullscreen="props.inFullscreen"></fullscreen-button>
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
          <icon-button
            icon="preview"
            size="sm"
						tooltip="View activity"
            @click="viewPrexcActivity(props.row.id)"
          ></icon-button>

					<icon-button
							icon="edit"
							size="sm"
							tooltip="Edit activity"
							color="blue"
							@click="editPrexcActivity(props.row.id)"
							:disabled="props.row.finalized"
					></icon-button>

          <icon-button
            icon="delete"
            size="sm"
            color="negative"
						tooltip="Delete activity"
            :disabled="props.row.finalized"
            @click="deletePrexcActivity(props.row.id)"
          ></icon-button>

          <icon-button
            icon="done"
            size="sm"
            color="green"
						tooltip="Finalize activity"
            :disabled="props.row.finalized"
            @click="finalizePrexcActivity(props.row.id)"
          ></icon-button>
        </q-td>
      </template>

      <template v-slot:bottom-row>
        <q-tr class="text-weight-bold">
          <q-td colspan="5">TOTAL</q-td>
          <q-td class="text-right">{{
            totalRow.infrastructure_target_total | money
          }}</q-td>
          <q-td class="text-right">{{ totalRow.investment_target_total  | money }}</q-td>
          <q-td class="text-right">{{ totalRow.gaa_total  | money }}</q-td>
          <q-td class="text-right">{{ totalRow.nep_total  | money }}</q-td>
          <q-td class="text-right">{{ totalRow.disbursement_total  | money }}</q-td>
          <q-td></q-td>
        </q-tr>
      </template>
    </q-table>
  </page-container>
</template>

<script>
import { PREXC_ACTIVITIES, PREXC_PROGRAMS, PREXC_SUBPROGRAMS } from '@/graphql';
import PageContainer from '@/ui/page/PageContainer.vue';
import PageTitle from '@/ui/page/PageTitle.vue';
import PrexcActivity from '@/components/programs/PrexcActivity.vue';
import ViewActivity from '@/components/programs/ViewActivity.vue';
import { wrapCsvValue } from 'src/utils';
import { exportFile, openURL, date, LocalStorage } from 'quasar';
import { programService } from 'src/services';

import {
	Search,
	FullscreenButton
} from '@/ui'
import IconButton from '../ui/buttons/IconButton'
import HelpButton from '../ui/buttons/HelpButton'

export default {
  components: {HelpButton, IconButton, Search, PageContainer, PageTitle, PrexcActivity, ViewActivity, FullscreenButton },
  name: 'PrexcActivities',
  apollo: {
    prexc_programs: {
      query: PREXC_PROGRAMS
    },
    prexc_subprograms: {
      query: PREXC_SUBPROGRAMS
    },
    prexc_activities: {
      query: PREXC_ACTIVITIES,
	    result() {
		    const now = Date.now();
		    const dateNow = date.formatDate(now, 'MMM D YYYY / HH:mm:ss A');
		    LocalStorage.set('lastUpdatedPrograms', dateNow);
		    this.lastUpdatedPrograms = dateNow;
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
    },
    isAc() {
      return this.$store.getters['auth/isAc']
    },
    isAa() {
      return this.$store.getters['auth/isAa']
    }
  },
  data() {
    return {
	    lastUpdatedPrograms: LocalStorage.getItem('lastUpdatedPrograms') || null,
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
          name: 'banner_program',
          label: 'Banner Program',
          field: row => row.banner_program && row.banner_program.name,
          align: 'left',
          sortable: true
        },
        {
          name: 'infrastructure_target_total',
          label: 'Infrastructure Investment (PhP)',
          field: row => row.infrastructure_target_total,
	        format: (val, row) => val && val.toLocaleString(),
          align: 'right',
          sortable: true
        },
        {
          name: 'investment_target_total',
          label: 'Total Investment (PhP)',
          field: row => row.investment_target_total,
	        format: (val, row) => val && val.toLocaleString(),
          align: 'right',
          sortable: true
        },
	      {
		      name: 'nep_total',
		      label: 'National Expenditure Program (PhP)',
		      field: row => row.nep_total,
					format: (val, row) => val && val.toLocaleString(),
		      align: 'right',
		      sortable: true
	      },
        {
          name: 'gaa_total',
          label: 'General Appropriations Act (PhP)',
          field: row => row.gaa_total,
	        format: (val, row) => val && val.toLocaleString(),
          align: 'right',
          sortable: true
        },
        {
          name: 'disbursement_total',
          label: 'Actual Disbursement (PhP)',
          field: row => row.disbursement_total,
	        format: (val, row) => val && val.toLocaleString(),
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
      viewPrexcActivityDialog: false,
      helps: [
        'This is for Tier 1 (ongoing programs/subprograms/activities) only. Use the Add Project module for Tier 2 proposals. Projects added via Add Project Module will appear here as an activity under the identified program/subprogram.',
        'This is the substitute for Form 4 of the Public Investment Program utilized in the FY 2019 updating of the Public Investment Program. It provides the summary of investment requirements and actual budget allocated and utilized per Program.',
        'This is patterned after the PREXC programs of the operating units with some modifications particularly on General Management and Supervision and Locally Funded and Foreign Assisted Program.',
        'For General Management and Supervision, only PAPs that fit the Three-Year Rolling Infrastructure Program should be reported.',
        'For locally-funded and foreign-assisted projects (excluding individual FMR projects), they should be submitted using the project profile form.'
      ]
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
      this.$apollo.queries.prexc_activities.refetch();
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
    deletePrexcActivity(id) {
      this.$q
        .dialog({
          title: 'Confirm Delete',
          message:
            'Are you sure you want to delete this item? Type <strong>YES</strong> to confirm.',
          cancel: true,
          html: true,
          prompt: {
            model: '',
            isValid: val => val && val.toLowerCase() === 'yes'
          }
        })
        .onOk(() => {
          this.$q.loading.show();
          programService.deletePrexcActivity({ id: id }).then(() => {
            this.$q.loading.hide();
            this.$q.notify({
              type: 'positive',
              message: 'Success'
            });
          });
        });
    },
    finalizePrexcActivity(id) {
      this.$q
        .dialog({
          title: 'Finalize Activity',
          message:
            'Are you sure you want to finalize this activity? You will no longer be able to edit it once finalized. Type <strong>YES</strong> to confirm.',
          html: true,
          prompt: {
            model: '',
            isValid: val => val.toLowerCase() === 'yes'
          },
          cancel: true
        })
        .onOk(() => {
          this.$q.loading.show();
          programService
            .finalizePrexcActivity({ id: id })
            .then(() => this.$q.notify({
              type: 'positive',
              message: 'Success!'
            }))
            .catch(err => this.$q.notify({
              type: 'negative',
              message: err.message
            }))
            .finally(() => this.$q.loading.hide());
        });
    },
    finalizePrexcActivities() {
    	if (!this.selected.length) {
    		alert('Select activities first')
			} else {
		    const id = this.selected.map(x => x.id);

		    this.$q
			    .dialog({
				    title: 'Finalize Activities',
				    message: `Are you sure you want to finalize these ${id.length} activities? You will no longer be able to edit it once finalized. Type <strong>YES</strong> to confirm.`,
				    html: true,
				    prompt: {
					    model: '',
					    isValid: val => val.toLowerCase() === 'yes'
				    },
				    cancel: true
			    })
			    .onOk(() => {
				    this.$q.loading.show();
				    programService
					    .finalizePrexcActivities({id: id})
					    .then(() => this.$q.notify({
						    type: 'positive',
						    message: 'Success!'
					    }))
					    .catch(err => this.$q.notify({
						    type: 'negative',
						    message: err.message
					    }))
					    .finally(() => this.$q.loading.hide());
			    });
	    }
    },
    exportExcel() {
      this.$q.loading.show()
      programService
        .exportExcel()
        .then(({ exportExcel }) => {
          this.$q.dialog({
            title: 'File Generated',
            message: `Click OK to download the file.`,
            html: true,
            cancel: true
          }).onOk(() => openURL(exportExcel.link, {
            target: '_blank'
          }))
        })
        .catch(err => {
          this.$q.notify({
            type: 'negative',
            message: err.message
          })
        })
        .finally(() => this.$q.loading.hide())
    }
  },
	filters: {
		money(val) {
			if (val) {
				return val.toLocaleString('en-US', {maximumFractionDigits:2})
			}
			return 0.00
		}
	}
};
</script>
