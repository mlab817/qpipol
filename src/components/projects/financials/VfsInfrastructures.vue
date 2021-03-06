<template>
	<q-table
			class="col"
			:data="data"
			hide-bottom
			:pagination="pagination"
			:columns="columns"
			bordered
			flat>
		<template v-slot:top-right>
			<q-toggle label="Toggle Copy" @input="copyMode = !copyMode" :value="copyMode" color="secondary" />
		</template>
		<template v-slot:body="props">
			<q-tr :props="props">
				<q-td>
					{{props.row.funding_source.name}}
				</q-td>
				<q-td :props="props">
					{{props.cols}}
				</q-td>
				<copy-td v-for="(col, index) in props.cols.filter(c => c.name !== 'funding_source')" :value="col.value" :key="index" :copy-mode="copyMode" />
			</q-tr>
		</template>
		<template v-slot:bottom-row>
			<q-tr>
				<q-td>Total</q-td>
				<copy-td :value="totalRow.infrastructure_target_2016" :copy-mode="copyMode" />
				<copy-td :value="totalRow.infrastructure_target_2017" :copy-mode="copyMode" />
				<copy-td :value="totalRow.infrastructure_target_2018" :copy-mode="copyMode" />
				<copy-td :value="totalRow.infrastructure_target_2019" :copy-mode="copyMode" />
				<copy-td :value="totalRow.infrastructure_target_2020" :copy-mode="copyMode" />
				<copy-td :value="totalRow.infrastructure_target_2021" :copy-mode="copyMode" />
				<copy-td :value="totalRow.infrastructure_target_2022" :copy-mode="copyMode" />
				<copy-td :value="totalRow.infrastructure_target_2023" :copy-mode="copyMode" />
				<copy-td :value="totalRow.infrastructure_target_2024" :copy-mode="copyMode" />
				<copy-td :value="totalRow.infrastructure_target_2025" :copy-mode="copyMode" />
				<copy-td :value="totalRow.infrastructure_target_total" :copy-mode="copyMode" />
			</q-tr>
		</template>
	</q-table>
</template>

<script>
	import CopyTd from './CopyTd'

	export default {
		name: 'VfsInfrastructures',
		components: {CopyTd},
		props: ['data'],
		computed: {
			totalRow() {
				const data = this.data

				const totalRow = {
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
					infrastructure_target_total: 0,
				}

				data.reduce((acc, item) => {
					acc['infrastructure_target_2016'] += item['infrastructure_target_2016']
					acc['infrastructure_target_2017'] += item['infrastructure_target_2017']
					acc['infrastructure_target_2018'] += item['infrastructure_target_2018']
					acc['infrastructure_target_2019'] += item['infrastructure_target_2019']
					acc['infrastructure_target_2020'] += item['infrastructure_target_2020']
					acc['infrastructure_target_2021'] += item['infrastructure_target_2021']
					acc['infrastructure_target_2022'] += item['infrastructure_target_2022']
					acc['infrastructure_target_2023'] += item['infrastructure_target_2023']
					acc['infrastructure_target_2024'] += item['infrastructure_target_2024']
					acc['infrastructure_target_2025'] += item['infrastructure_target_2025']
					acc['infrastructure_target_total'] += item['infrastructure_target_total']
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
						name: 'funding_source',
						label: 'Funding Source',
						field: row => row.funding_source ? row.funding_source.name : '',
						align: 'left'
					},
					{
						name: 'infrastructure_target_2016',
						label: '2016 & Prior',
						field: 'infrastructure_target_2016'
					},
					{
						name: 'infrastructure_target_2017',
						label: '2017',
						field: 'infrastructure_target_2017'
					},
					{
						name: 'infrastructure_target_2018',
						label: '2018',
						field: 'infrastructure_target_2018'
					},
					{
						name: 'infrastructure_target_2019',
						label: '2019',
						field: 'infrastructure_target_2019'
					},
					{
						name: 'infrastructure_target_2020',
						label: '2020',
						field: 'infrastructure_target_2020'
					},
					{
						name: 'infrastructure_target_2021',
						label: '2021',
						field: 'infrastructure_target_2021'
					},
					{
						name: 'infrastructure_target_2022',
						label: '2022',
						field: 'infrastructure_target_2022'
					},
					{
						name: 'infrastructure_target_2023',
						label: '2023',
						field: 'infrastructure_target_2023'
					},
					{
						name: 'infrastructure_target_2024',
						label: '2024',
						field: 'infrastructure_target_2024'
					},
					{
						name: 'infrastructure_target_2025',
						label: '2025 & Beyond',
						field: 'infrastructure_target_2025'
					},
					{
						name: 'infrastructure_target_total',
						label: 'Total',
						field: 'infrastructure_target_total'
					},
				]
			}
		}
	}
</script>
