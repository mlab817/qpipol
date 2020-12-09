<template>
	<div class="col q-pa-md">
		<q-dialog v-model="addDialog" full-height
							:position="$q.screen.xs ? void 0 : 'right'"
							persistent
							:maximized="$q.screen.xs"
							transition-show="jump-left"
							transition-hide="jump-right">
			<add-infra :taken="taken" :edit-mode="false" :infrastructure-to-edit="infrastructureToSubmit" :project-id="projectId" @close="addDialog = false" />
		</q-dialog>

		<q-dialog v-model="editDialog" full-height
							:position="$q.screen.xs ? void 0 : 'right'"
							persistent
							:maximized="$q.screen.xs"
							transition-show="jump-left"
							transition-hide="jump-right">
			<add-infra :taken="taken" :edit-mode="true" :infrastructure-to-edit="infrastructureToSubmit" @close="editDialog = false"/>
		</q-dialog>

		<q-table
				flat
				bordered
				separator="cell"
				wrap-cells
				title="Total Infrastructure Requirement by Funding Source (in absolute PhP)"
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
	</div>
</template>

<script>
	import { projectService } from 'src/services';
	import PlusButton from '../../../ui/buttons/PlusButton'
	import AddInfra from './AddInfra'

	export default {
		name: 'FsInfrastructure',
		components: {AddInfra, PlusButton },
		props: ['data', 'projectId'],

		computed: {
			editMode() {
				return !!this.infrastructureToSubmit.id;
			},
			taken() {
				const fs = this.data;

				const taken = fs.map(x => x.funding_source_id);

				return taken;
			},
			totalRow() {
				const data = this.data;

				let arraySum = {
					infrastructure_target_2016: 0,
					infrastructure_target_2017: 0,
					infrastructure_target_2018: 0,
					infrastructure_target_2019: 0,
					infrastructure_target_2020: 0,
					infrastructure_target_2021: 0,
					infrastructure_target_2022: 0,
					infrastructure_target_2023: 0,
					infrastructure_target_2024: 0,
					infrastructure_target_2025: 0,
					infrastructure_target_total: 0
				};

				arraySum = data.reduce((prev, cur) => {
					arraySum.infrastructure_target_2016 += cur.infrastructure_target_2016;
					arraySum.infrastructure_target_2017 += cur.infrastructure_target_2017;
					arraySum.infrastructure_target_2018 += cur.infrastructure_target_2018;
					arraySum.infrastructure_target_2019 += cur.infrastructure_target_2019;
					arraySum.infrastructure_target_2020 += cur.infrastructure_target_2020;
					arraySum.infrastructure_target_2021 += cur.infrastructure_target_2021;
					arraySum.infrastructure_target_2022 += cur.infrastructure_target_2022;
					arraySum.infrastructure_target_2023 += cur.infrastructure_target_2023;
					arraySum.infrastructure_target_2024 += cur.infrastructure_target_2024;
					arraySum.infrastructure_target_2025 += cur.infrastructure_target_2025;
					arraySum.infrastructure_target_total +=
						cur.infrastructure_target_2016 +
						cur.infrastructure_target_2017 +
						cur.infrastructure_target_2018 +
						cur.infrastructure_target_2019 +
						cur.infrastructure_target_2020 +
						cur.infrastructure_target_2021 +
						cur.infrastructure_target_2022 +
						cur.infrastructure_target_2023 +
						cur.infrastructure_target_2024 +
						cur.infrastructure_target_2025;
					return arraySum;
				}, arraySum);

				return arraySum;
			},
			infrastructure_target_total() {
				const infrastructureToSubmit = this.infrastructureToSubmit

				const total = Object.keys(infrastructureToSubmit).filter(key => key !== 'funding_source_id').reduce((acc, value) => (acc + infrastructureToSubmit[value]), 0);

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
				infrastructureToSubmit: {
					id: null,
					funding_source_id: null,
					project_id: null,
					infrastructure_target_2016: 0,
					infrastructure_target_2017: 0,
					infrastructure_target_2018: 0,
					infrastructure_target_2019: 0,
					infrastructure_target_2020: 0,
					infrastructure_target_2021: 0,
					infrastructure_target_2022: 0,
					infrastructure_target_2023: 0,
					infrastructure_target_2024: 0,
					infrastructure_target_2025: 0
				},
				columns: [
					{
						name: 'funding_source',
						label: 'Funding Source',
						field: row => row.funding_source && row.funding_source.name,
						align: 'left'
					},
					{
						name: 'y1',
						label: '2016 & Prior',
						field: row => row.infrastructure_target_2016,
						format: (val, row) => val && val.toLocaleString(),
					},
					{
						name: 'y2',
						label: '2017',
						field: row => row.infrastructure_target_2017,
						format: (val, row) => val && val.toLocaleString(),
					},
					{
						name: 'y3',
						label: '2018',
						field: row => row.infrastructure_target_2018,
						format: (val, row) => val && val.toLocaleString(),
					},
					{
						name: 'y4',
						label: '2019',
						field: row => row.infrastructure_target_2019,
						format: (val, row) => val && val.toLocaleString(),
					},
					{
						name: 'y5',
						label: '2020',
						field: row => row.infrastructure_target_2020,
						format: (val, row) => val && val.toLocaleString(),
					},
					{
						name: 'y6',
						label: '2021',
						field: row => row.infrastructure_target_2021,
						format: (val, row) => val && val.toLocaleString(),
					},
					{
						name: 'y7',
						label: '2022',
						field: row => row.infrastructure_target_2022,
						format: (val, row) => val && val.toLocaleString(),
					},
					{
						name: 'y8',
						label: '2023',
						field: row => row.infrastructure_target_2023,
						format: (val, row) => val && val.toLocaleString(),
					},
					{
						name: 'y9',
						label: '2024',
						field: row => row.infrastructure_target_2024,
						format: (val, row) => val && val.toLocaleString(),
					},
					{
						name: 'y10',
						label: '2025 & Beyond',
						field: row => row.infrastructure_target_2025,
						format: (val, row) => val && val.toLocaleString(),
					},
					{
						name: 'total',
						label: 'Total',
						field: row =>
							row.infrastructure_target_2016 +
							row.infrastructure_target_2017 +
							row.infrastructure_target_2018 +
							row.infrastructure_target_2019 +
							row.infrastructure_target_2020 +
							row.infrastructure_target_2021 +
							row.infrastructure_target_2022 +
							row.infrastructure_target_2023 +
							row.infrastructure_target_2024 +
							row.infrastructure_target_2025,
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
				this.infrastructureToSubmit = {
					// id: null,
					funding_source_id: null,
					infrastructure_target_2016: 0,
					infrastructure_target_2017: 0,
					infrastructure_target_2018: 0,
					infrastructure_target_2019: 0,
					infrastructure_target_2020: 0,
					infrastructure_target_2021: 0,
					infrastructure_target_2022: 0,
					infrastructure_target_2023: 0,
					infrastructure_target_2024: 0,
					infrastructure_target_2025: 0
				};

				this.addDialog = true;
			},
			editRow(row) {
				const {
					id,
					funding_source_id,
					project_id,
					infrastructure_target_2016,
					infrastructure_target_2017,
					infrastructure_target_2018,
					infrastructure_target_2019,
					infrastructure_target_2020,
					infrastructure_target_2021,
					infrastructure_target_2022,
					infrastructure_target_2023,
					infrastructure_target_2024,
					infrastructure_target_2025
				} = row
				this.infrastructureToSubmit = {
					id: id,
					funding_source_id: funding_source_id,
					project_id: project_id,
					infrastructure_target_2016: infrastructure_target_2016,
					infrastructure_target_2017: infrastructure_target_2017,
					infrastructure_target_2018: infrastructure_target_2018,
					infrastructure_target_2019: infrastructure_target_2019,
					infrastructure_target_2020: infrastructure_target_2020,
					infrastructure_target_2021: infrastructure_target_2021,
					infrastructure_target_2022: infrastructure_target_2022,
					infrastructure_target_2023: infrastructure_target_2023,
					infrastructure_target_2024: infrastructure_target_2024,
					infrastructure_target_2025: infrastructure_target_2025
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
							.deleteFundingSourceInfrastructure({ id: row.id })
							.then(() => this.$q.loading.hide());
					});
			}
		}
	};
</script>
