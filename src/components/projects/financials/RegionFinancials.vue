<template>
  <div class="col q-pa-md">
    <q-dialog
			v-model="addDialog"
			full-height
			:position="$q.screen.xs ? void 0 : 'right'"
			persistent
			:maximized="$q.screen.xs"
			transition-show="jump-left"
			transition-hide="jump-right"
		>>
      <add-region :taken="taken" :edit-mode="false" :investment-to-edit="investmentToSubmit" :project-id="projectId" @close="addDialog = false" />
    </q-dialog>

		<q-dialog
			v-model="editDialog"
			full-height
			:position="$q.screen.xs ? void 0 : 'right'"
			persistent
			:maximized="$q.screen.xs"
			transition-show="jump-left"
			transition-hide="jump-right">
			<add-region :taken="taken" :edit-mode="true" :investment-to-edit="investmentToSubmit" @close="editDialog = false"/>
		</q-dialog>

    <q-table
      flat
      bordered
      separator="cell"
      wrap-cells
      title="Total Investment Requirement by Region (in absolute PhP)"
      class="col"
      :data="data"
      :columns="columns"
      :pagination="pagination"
      hide-bottom
    >
      <template v-slot:top-right>
				<plus-button @click="addRow" />
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            icon="edit"
            flat
            round
            size="sm"
            @click="editRow(props.row)"
            color="blue"
          />
          <q-btn
            icon="delete"
            flat
            round
            size="sm"
            @click="deleteRow(props.row)"
            color="red"
          />
        </q-td>
      </template>

      <template v-slot:bottom-row>
        <q-tr class="text-weight-bold">
          <q-td>TOTAL</q-td>
          <q-td class="text-right" v-for="(item, key) in totalRow" :key="key">
            {{ item && item.toLocaleString() }}
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <div class="row text-caption q-pt-sm justify-end">
      Note: Each new and updated item are saved immediately in the database.
    </div>
  </div>
</template>

<script>
import { projectService } from 'src/services';
import PlusButton from '../../../ui/buttons/PlusButton'
import AddRegion from './AddRegion'

export default {
  name: 'RegionFinancials',
	components: { AddRegion, PlusButton },
	props: ['data', 'projectId'],

  computed: {
    editMode() {
      return !!this.investmentToSubmit.id;
    },
    taken() {
      const fs = this.data;

      const taken = fs.map(x => x.region_id);

      return taken;
    },
    totalRow() {
      const data = this.data;

      let arraySum = {
        investment_target_2016: 0,
        investment_target_2017: 0,
        investment_target_2018: 0,
        investment_target_2019: 0,
        investment_target_2020: 0,
        investment_target_2021: 0,
        investment_target_2022: 0,
        investment_target_2023: 0,
        investment_target_2024: 0,
        investment_target_2025: 0,
        investment_target_total: 0
      };

      arraySum = data.reduce((prev, cur) => {
        arraySum.investment_target_2016 += cur.investment_target_2016;
        arraySum.investment_target_2017 += cur.investment_target_2017;
        arraySum.investment_target_2018 += cur.investment_target_2018;
        arraySum.investment_target_2019 += cur.investment_target_2019;
        arraySum.investment_target_2020 += cur.investment_target_2020;
        arraySum.investment_target_2021 += cur.investment_target_2021;
        arraySum.investment_target_2022 += cur.investment_target_2022;
        arraySum.investment_target_2023 += cur.investment_target_2023;
        arraySum.investment_target_2024 += cur.investment_target_2024;
        arraySum.investment_target_2025 += cur.investment_target_2025;
        arraySum.investment_target_total +=
          cur.investment_target_2016 +
          cur.investment_target_2017 +
          cur.investment_target_2018 +
          cur.investment_target_2019 +
          cur.investment_target_2020 +
          cur.investment_target_2021 +
          cur.investment_target_2022 +
          cur.investment_target_2023 +
          cur.investment_target_2024 +
          cur.investment_target_2025;
        return arraySum;
      }, arraySum);

      return arraySum;
    },
		investment_target_total() {
    	const investmentToSubmit = this.investmentToSubmit

			const total = Object.keys(investmentToSubmit).filter(key => key !== 'region_id').reduce((acc, value) => (acc + investmentToSubmit[value]), 0);

			return total
		}
  },
  data() {
    return {
      funding_sources: [],
      addDialog: false,
			editDialog: false,
      pagination: {
        rowsPerPage: 0
      },
      investmentToSubmit: {
        id: null,
        region_id: null,
				project_id: null,
        investment_target_2016: 0,
        investment_target_2017: 0,
        investment_target_2018: 0,
        investment_target_2019: 0,
        investment_target_2020: 0,
        investment_target_2021: 0,
        investment_target_2022: 0,
        investment_target_2023: 0,
        investment_target_2024: 0,
        investment_target_2025: 0
      },
      columns: [
        {
          name: 'region',
          label: 'Region',
          field: row => row.region && row.region.name,
          align: 'left'
        },
        {
          name: 'y1',
          label: '2016 & Prior',
          field: row => row.investment_target_2016,
					format: (val, row) => val && val.toLocaleString(),
        },
        {
          name: 'y2',
          label: '2017',
          field: row => row.investment_target_2017,
					format: (val, row) => val && val.toLocaleString(),
        },
        {
          name: 'y3',
          label: '2018',
          field: row => row.investment_target_2018,
					format: (val, row) => val && val.toLocaleString(),
        },
        {
          name: 'y4',
          label: '2019',
          field: row => row.investment_target_2019,
					format: (val, row) => val && val.toLocaleString(),
        },
        {
          name: 'y5',
          label: '2020',
          field: row => row.investment_target_2020,
					format: (val, row) => val && val.toLocaleString(),
        },
        {
          name: 'y6',
          label: '2021',
          field: row => row.investment_target_2021,
					format: (val, row) => val && val.toLocaleString(),
        },
        {
          name: 'y7',
          label: '2022',
          field: row => row.investment_target_2022,
					format: (val, row) => val && val.toLocaleString(),
        },
        {
          name: 'y8',
          label: '2023',
          field: row => row.investment_target_2023,
					format: (val, row) => val && val.toLocaleString(),
        },
        {
          name: 'y9',
          label: '2024',
          field: row => row.investment_target_2024,
					format: (val, row) => val && val.toLocaleString(),
        },
        {
          name: 'y10',
          label: '2025 & Beyond',
          field: row => row.investment_target_2025,
					format: (val, row) => val && val.toLocaleString(),
        },
        {
          name: 'total',
          label: 'Total',
          field: row =>
            row.investment_target_2016 +
            row.investment_target_2017 +
            row.investment_target_2018 +
            row.investment_target_2019 +
            row.investment_target_2020 +
            row.investment_target_2021 +
            row.investment_target_2022 +
            row.investment_target_2023 +
            row.investment_target_2024 +
            row.investment_target_2025,
	        format: (val, row) => val && val.toLocaleString(),
        },
        {
          name: 'actions',
          label: 'Actions',
					align: 'center'
        }
      ]
    };
  },
  methods: {
    addRow() {
      // console.log('add row')
      this.investmentToSubmit = {
        // id: null,
        region_id: null,
        investment_target_2016: 0,
        investment_target_2017: 0,
        investment_target_2018: 0,
        investment_target_2019: 0,
        investment_target_2020: 0,
        investment_target_2021: 0,
        investment_target_2022: 0,
        investment_target_2023: 0,
        investment_target_2024: 0,
        investment_target_2025: 0
      };

      this.addDialog = true;
    },
    editRow(row) {
    		const {
    			id,
					region_id,
					project_id,
			    investment_target_2016,
			    investment_target_2017,
			    investment_target_2018,
			    investment_target_2019,
			    investment_target_2020,
			    investment_target_2021,
			    investment_target_2022,
			    investment_target_2023,
			    investment_target_2024,
			    investment_target_2025
				} = row
    		this.investmentToSubmit = {
			    id: id,
			    region_id: region_id,
					project_id: project_id,
			    investment_target_2016: investment_target_2016,
			    investment_target_2017: investment_target_2017,
			    investment_target_2018: investment_target_2018,
			    investment_target_2019: investment_target_2019,
			    investment_target_2020: investment_target_2020,
			    investment_target_2021: investment_target_2021,
			    investment_target_2022: investment_target_2022,
			    investment_target_2023: investment_target_2023,
			    investment_target_2024: investment_target_2024,
			    investment_target_2025: investment_target_2025
		    }

      	this.editDialog = true;
    },
    deleteRow(row) {
      this.$q
        .dialog({
          title: 'Confirm Delete',
          message: 'Are you sure you want to delete this item?',
          cancel: true
        })
        .onOk(() => {
          this.$q.loading.show();
          projectService
            .deleteRegionFinancial({ id: row.id })
            .then(() => this.$q.loading.hide());
        });
    }
  }
};
</script>
