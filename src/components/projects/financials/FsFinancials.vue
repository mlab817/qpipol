<template>
	<div class="col q-pa-md">
    {{ data }}
		<q-dialog v-model="addDialog"
			full-height
			:position="$q.screen.xs ? void 0 : 'right'"
			persistent
			:maximized="$q.screen.xs"
			transition-show="jump-left"
			transition-hide="jump-right">
			<add-fs :taken="taken" :edit-mode="false" :investment-to-edit="investmentToSubmit" :project-id="projectId" @close="addDialog = false" />
		</q-dialog>

		<q-dialog
			v-model="editDialog"
			full-height
			:position="$q.screen.xs ? void 0 : 'right'"
			persistent
			:maximized="$q.screen.xs"
			transition-show="jump-left"
			transition-hide="jump-right">
			<add-fs :taken="taken" :edit-mode="true" :investment-to-edit="investmentToSubmit" @close="editDialog = false"/>
		</q-dialog>

		<q-table
				flat
				bordered
				separator="cell"
				wrap-cells
				title="Total Investment Requirement by Funding Source (in absolute PhP)"
				class="col"
				:data="data"
				:columns="columns"
				:pagination="pagination"
				hide-bottom
        dense
		>
			<template v-slot:top-right>
				<plus-button @click="addRow" />
			</template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td :props="props" key="funding_source_id">
            {{ getFs(props.row.funding_source_id) }}
            <q-popup-edit v-model="props.row.funding_source_id" buttons title="Funding Source">
              <funding-source v-model="props.row.funding_source_id"></funding-source>
            </q-popup-edit>
          </q-td>
          <q-td :props="props" key="investment_target_2016">
            {{props.row.investment_target_2016 | money}}
            <q-popup-edit v-model="props.row.investment_target_2016" buttons>
              <money-input v-model="props.row.investment_target_2016"></money-input>
            </q-popup-edit>
          </q-td>
          <q-td :props="props" key="investment_target_2017">
            {{props.row.investment_target_2017 | money}}
            <q-popup-edit v-model="props.row.investment_target_2017" buttons>
              <money-input v-model="props.row.investment_target_2017"></money-input>
            </q-popup-edit>
          </q-td>
          <q-td :props="props" key="investment_target_2018">
            {{props.row.investment_target_2018 | money}}
            <q-popup-edit v-model="props.row.investment_target_2018" buttons>
              <money-input v-model="props.row.investment_target_2018"></money-input>
            </q-popup-edit>
          </q-td>
          <q-td :props="props" key="investment_target_2019">
            {{props.row.investment_target_2019 | money}}
            <q-popup-edit v-model="props.row.investment_target_2019" buttons>
              <money-input v-model="props.row.investment_target_2019"></money-input>
            </q-popup-edit>
          </q-td>
          <q-td :props="props" key="investment_target_2020">
            {{props.row.investment_target_2020 | money}}
            <q-popup-edit v-model="props.row.investment_target_2020" buttons>
              <money-input v-model="props.row.investment_target_2020"></money-input>
            </q-popup-edit>
          </q-td>
          <q-td :props="props" key="investment_target_2021">
            {{props.row.investment_target_2021 | money}}
            <q-popup-edit v-model="props.row.investment_target_2021" buttons>
              <money-input v-model="props.row.investment_target_2021"></money-input>
            </q-popup-edit>
          </q-td>
          <q-td :props="props" key="investment_target_2022">
            {{props.row.investment_target_2022 | money}}
            <q-popup-edit v-model="props.row.investment_target_2022" buttons>
              <money-input v-model="props.row.investment_target_2022"></money-input>
            </q-popup-edit>
          </q-td>
          <q-td :props="props" key="investment_target_2023">
            {{props.row.investment_target_2023 | money}}
            <q-popup-edit v-model="props.row.investment_target_2023" buttons>
              <money-input v-model="props.row.investment_target_2023"></money-input>
            </q-popup-edit>
          </q-td>
          <q-td :props="props" key="investment_target_2024">
            {{props.row.investment_target_2024 | money}}
            <q-popup-edit v-model="props.row.investment_target_2024" buttons>
              <money-input v-model="props.row.investment_target_2024"></money-input>
            </q-popup-edit>
          </q-td>
          <q-td :props="props" key="investment_target_2025">
            {{props.row.investment_target_2025 | money}}
            <q-popup-edit v-model="props.row.investment_target_2025" buttons>
              <money-input v-model="props.row.investment_target_2025"></money-input>
            </q-popup-edit>
          </q-td>
          <q-td :props="props" key="investment_target_total">
            {{props.row.investment_target_total | money}}
          </q-td>
          <q-td :props="props" key="actions">
            <q-btn
              icon="delete"
              flat
              round
              size="sm"
              @click="deleteRow(props.row)"
              color="red"
            />
          </q-td>
        </q-tr>
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
	import AddFs from './AddFs'
  import MoneyInput from "src/ui/form-inputs/MoneyInput";
	import FundingSource from "components/projects/dropdowns/FundingSource";
  import {FETCH_FUNDING_SOURCES} from "src/graphql";

	export default {
		name: 'FsFinancials',
		components: {MoneyInput, AddFs, FundingSource, PlusButton },
		props: ['data', 'projectId'],

    apollo: {
		  funding_sources: {
		    query: FETCH_FUNDING_SOURCES
      }
    },

		computed: {
			editMode() {
				return !!this.investmentToSubmit.id;
			},
			taken() {
				const fs = this.data;

				const taken = fs.map(x => x.funding_source_id);

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

				const total = Object.keys(investmentToSubmit).filter(key => key !== 'funding_source_id').reduce((acc, value) => (acc + investmentToSubmit[value]), 0);

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
					funding_source_id: null,
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
						name: 'funding_source_id',
						label: 'Funding Source',
						field: row => row.funding_source_id,
						align: 'left'
					},
					{
						name: 'investment_target_2016',
						label: '2016 & Prior',
						field: row => row.investment_target_2016,
						format: (val, row) => val && val.toLocaleString(),
					},
					{
						name: 'investment_target_2017',
						label: '2017',
						field: row => row.investment_target_2017,
						format: (val, row) => val && val.toLocaleString(),
					},
					{
						name: 'investment_target_2018',
						label: '2018',
						field: row => row.investment_target_2018,
						format: (val, row) => val && val.toLocaleString(),
					},
					{
						name: 'investment_target_2019',
						label: '2019',
						field: row => row.investment_target_2019,
						format: (val, row) => val && val.toLocaleString(),
					},
					{
						name: 'investment_target_2020',
						label: '2020',
						field: row => row.investment_target_2020,
						format: (val, row) => val && val.toLocaleString(),
					},
					{
						name: 'investment_target_2021',
						label: '2021',
						field: row => row.investment_target_2021,
						format: (val, row) => val && val.toLocaleString(),
					},
					{
						name: 'investment_target_2022',
						label: '2022',
						field: row => row.investment_target_2022,
						format: (val, row) => val && val.toLocaleString(),
					},
					{
						name: 'investment_target_2023',
						label: '2023',
						field: row => row.investment_target_2023,
						format: (val, row) => val && val.toLocaleString(),
					},
					{
						name: 'investment_target_2024',
						label: '2024',
						field: row => row.investment_target_2024,
						format: (val, row) => val && val.toLocaleString(),
					},
					{
						name: 'investment_target_2025',
						label: '2025 & Beyond',
						field: row => row.investment_target_2025,
						format: (val, row) => val && val.toLocaleString(),
					},
					{
						name: 'investment_target_total',
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
            label: ''
          }
				]
			};
		},
		methods: {
			addRow() {
				// console.log('add row')
				const investmentToSubmit = {
					id: null,
					funding_source_id: null,
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

				// this.addDialog = true;
        this.data.push(investmentToSubmit)
			},
			editRow(row) {
				const {
					id,
					funding_source_id,
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
					funding_source_id: funding_source_id,
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
							.deleteFundingSourceFinancial({ id: row.id })
							.then(() => this.$q.loading.hide());
					});
			},
      getFs(fsId) {
			  console.log(fsId)
			  const fs = this.funding_sources.find(fs => parseInt(fs.id) === parseInt(fsId))
        console.log(fs)
        return fs && fs.name
      }
		},
    filters: {
		  money(val) {
		    return val && val.toLocaleString()
      }
    }
	};
</script>
