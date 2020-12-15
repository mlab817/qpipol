<template>
	<q-table
    class="col"
    :data="data"
    hide-bottom
    :pagination="pagination"
    :columns="columns"
    bordered
    flat
    dense>
		<template v-slot:body="props">
			<q-tr :props="props">
				<q-td>
					{{props.row.region && props.row.region .name}}
				</q-td>
				<q-td :props="props">
					{{props.cols}}
				</q-td>
				<td-click v-for="(col, index) in props.cols.filter(c => c.name !== 'region')" :value="col.value" :key="index" />
			</q-tr>
		</template>
		<template v-slot:bottom-row>
			<q-tr>
				<q-td>Total</q-td>
				<td-click :value="totalRow.investment_target_2016" />
				<td-click :value="totalRow.investment_target_2017" />
				<td-click :value="totalRow.investment_target_2018" />
				<td-click :value="totalRow.investment_target_2019" />
				<td-click :value="totalRow.investment_target_2020" />
				<td-click :value="totalRow.investment_target_2021" />
				<td-click :value="totalRow.investment_target_2022" />
				<td-click :value="totalRow.investment_target_2023" />
				<td-click :value="totalRow.investment_target_2024" />
				<td-click :value="totalRow.investment_target_2025" />
				<td-click :value="totalRow.investment_target_total" />
			</q-tr>
		</template>
	</q-table>
</template>

<script>
	import TdClick from "components/projects/shared/TdClick";

	export default {
		name: 'VrFinancials',
		components: {
		  TdClick
    },
		props: ['data'],
		computed: {
			totalRow() {
				const data = this.data

				const totalRow = {
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
					investment_target_total: 0,
				}

				data && data.reduce((acc, item) => {
					acc['investment_target_2016'] += item['investment_target_2016']
					acc['investment_target_2017'] += item['investment_target_2017']
					acc['investment_target_2018'] += item['investment_target_2018']
					acc['investment_target_2019'] += item['investment_target_2019']
					acc['investment_target_2020'] += item['investment_target_2020']
					acc['investment_target_2021'] += item['investment_target_2021']
					acc['investment_target_2022'] += item['investment_target_2022']
					acc['investment_target_2023'] += item['investment_target_2023']
					acc['investment_target_2024'] += item['investment_target_2024']
					acc['investment_target_2025'] += item['investment_target_2025']
					acc['investment_target_total'] += item['investment_target_total']
					return acc
				}, totalRow)

				return totalRow
			}
		},
		data() {
			return {
				pagination: {
					rowsPerPage: 0
				},
				copyMode: false,
				columns: [
					{
						name: 'region',
						label: 'Region',
						field: row => row.region ? row.region.name : '',
						align: 'left'
					},
					{
						name: 'investment_target_2016',
						label: '2016 & Prior',
						field: 'investment_target_2016'
					},
					{
						name: 'investment_target_2017',
						label: '2017',
						field: 'investment_target_2017'
					},
					{
						name: 'investment_target_2018',
						label: '2018',
						field: 'investment_target_2018'
					},
					{
						name: 'investment_target_2019',
						label: '2019',
						field: 'investment_target_2019'
					},
					{
						name: 'investment_target_2020',
						label: '2020',
						field: 'investment_target_2020'
					},
					{
						name: 'investment_target_2021',
						label: '2021',
						field: 'investment_target_2021'
					},
					{
						name: 'investment_target_2022',
						label: '2022',
						field: 'investment_target_2022'
					},
					{
						name: 'investment_target_2023',
						label: '2023',
						field: 'investment_target_2023'
					},
					{
						name: 'investment_target_2024',
						label: '2024',
						field: 'investment_target_2024'
					},
					{
						name: 'investment_target_2025',
						label: '2025 & Beyond',
						field: 'investment_target_2025'
					},
					{
						name: 'investment_target_total',
						label: 'Total',
						field: 'investment_target_total'
					},
				]
			}
		}
	}
</script>
