<template>
	<page-container>
		<template v-slot:title>
			<page-title title="Upload Programs"></page-title>
		</template>

		<q-file stack-label outlined label="Choose your CSV file here" v-model="file" accept=".csv" clearable>
			<template v-slot:append>
        <q-btn round dense flat icon="send" @click="parse" :disable="!file" />
      </template>
		</q-file>

		<div class="row q-my-md" v-if="data.length">
			<q-table 
				class="col" 
				title="Preview" 
				:data="data" 
				wrap-cells 
				:columns="columns" 
				selection="multiple" 
				row-key="ID" 
				:selected.sync="selected"
				:filter="filter"
				>
				<template v-slot:top-right>
					<div class="row q-gutter-sm">
						<search v-model="filter" />
						<q-btn icon="delete" label="Delete" color="negative" :disable="!selected.length" @click="deleteSelected" />
						<q-btn icon="save" label="Save" color="primary" :disable="!selected.length" @click="saveSelected" />
					</div>
				</template>

				<template v-slot:body-cell-actions="props">
					<q-td :props="props">
						<q-btn icon="save" flat round dense @click="saveRow(props.row)" color="primary"></q-btn>
					</q-td>
				</template>
			</q-table>
		</div>

		<div v-else class="q-my-md">
			Data will be previewed here...
		</div>

		<div class="column" v-if="errors.length">
			<p>Errors: </p>
			<ul>
				<li v-for="(error, index) in errors" :key="index">
					{{error.message}}
				</li>
			</ul>
		</div>

	</page-container>
</template>

<script>
	import {
		PageContainer,
		PageTitle,
		Search
	} from '@/ui'
	import {
		PREXC_PROGRAMS,
		PREXC_SUBPROGRAMS
	} from '@/graphql'

	export default {
		components: {
			PageContainer,
			PageTitle,
			Search
		},
		name: 'PageTest',
		data() {
			return {
				file: null,
				selected: [],
				prexc_programs: [],
				prexc_subprograms: [],
				filter: ''
			}
		},
		apollo: {
			prexc_programs: {
				query: PREXC_PROGRAMS
			},
			prexc_subprograms: {
				query: PREXC_SUBPROGRAMS
			}
		},
		computed: {
			recoded() {
				const data = this.data,
					prexc_programs = this.prexc_programs,
					prexc_subprograms = this.prexc_subprograms

				// remove total row first
				const recoded = data.filter(d => d.ID !== 'Total').map(x => {
					const p = prexc_programs.find(p => x.Program === p.name)
					const sp = prexc_subprograms.find(sp => x.Subprogram === sp.name)

					return {
						id: x.ID,
						activity: x.Activity,
						uacs_code: x['UACS Code'],
						infrastructure_target_2016: x['Infrastructure Investments (PhP)_2016 & Prior'],
						infrastructure_target_2017: x['Infrastructure Investments (PhP)_2017'],
						infrastructure_target_2018: x['Infrastructure Investments (PhP)_2018'],
						infrastructure_target_2019: x['Infrastructure Investments (PhP)_2019'],
						infrastructure_target_2020: x['Infrastructure Investments (PhP)_2020'],
						infrastructure_target_2021: x['Infrastructure Investments (PhP)_2021'],
						infrastructure_target_2022: x['Infrastructure Investments (PhP)_2022'],
						infrastructure_target_2023: x['Infrastructure Investments (PhP)_2023'],
						infrastructure_target_2024: x['Infrastructure Investments (PhP)_2024'],
						infrastructure_target_2025: x['Infrastructure Investments (PhP)_2025 & Beyond'],
						infrastructure_target_total: x['Infrastructure Investments (PhP)_Total'],
						investment_target_2016: x['Total Investments (PhP)_2016 & Prior'],
						investment_target_2017: x['Total Investments (PhP)_2017'],
						investment_target_2018: x['Total Investments (PhP)_2018'],
						investment_target_2019: x['Total Investments (PhP)_2019'],
						investment_target_2020: x['Total Investments (PhP)_2020'],
						investment_target_2021: x['Total Investments (PhP)_2021'],
						investment_target_2022: x['Total Investments (PhP)_2022'],
						investment_target_2023: x['Total Investments (PhP)_2023'],
						investment_target_2024: x['Total Investments (PhP)_2024'],
						investment_target_2025: x['Total Investments (PhP)_2025 & Beyond'],
						investment_target_total: x['Total Investments (PhP)_Total'],
						nep_2016: x['National Expenditure Program (PhP)_2016 & Prior'],
						nep_2017: x['National Expenditure Program (PhP)_2017'],
						nep_2018: x['National Expenditure Program (PhP)_2018'],
						nep_2019: x['National Expenditure Program (PhP)_2019'],
						nep_2020: x['National Expenditure Program (PhP)_2020'],
						nep_2021: x['National Expenditure Program (PhP)_2021'],
						nep_2022: x['National Expenditure Program (PhP)_2022'],
						nep_2023: x['National Expenditure Program (PhP)_2023'],
						nep_2024: x['National Expenditure Program (PhP)_2024'],
						nep_2025: x['National Expenditure Program (PhP)_2025 & Beyond'],
						nep_total: x['National Expenditure Program (PhP)_Total'],
						gaa_2016: x['General Appropriations Act (PhP)_2016 & Prior'],
						gaa_2017: x['General Appropriations Act (PhP)_2017'],
						gaa_2018: x['General Appropriations Act (PhP)_2018'],
						gaa_2019: x['General Appropriations Act (PhP)_2019'],
						gaa_2020: x['General Appropriations Act (PhP)_2020'],
						gaa_2021: x['General Appropriations Act (PhP)_2021'],
						gaa_2022: x['General Appropriations Act (PhP)_2022'],
						gaa_2023: x['General Appropriations Act (PhP)_2023'],
						gaa_2024: x['General Appropriations Act (PhP)_2024'],
						gaa_2025: x['General Appropriations Act (PhP)_2025 & Beyond'],
						gaa_total: x['General Appropriations Act (PhP)_Total'],
						disbursement_2016: x['Actual Disbursements (PhP)_2016 & Prior'],
						disbursement_2017: x['Actual Disbursements (PhP)_2017'],
						disbursement_2018: x['Actual Disbursements (PhP)_2018'],
						disbursement_2019: x['Actual Disbursements (PhP)_2019'],
						disbursement_2020: x['Actual Disbursements (PhP)_2020'],
						disbursement_2021: x['Actual Disbursements (PhP)_2021'],
						disbursement_2022: x['Actual Disbursements (PhP)_2022'],
						disbursement_2023: x['Actual Disbursements (PhP)_2023'],
						disbursement_2024: x['Actual Disbursements (PhP)_2024'],
						disbursement_2025: x['Actual Disbursements (PhP)_2025 & Beyond'],
						disbursement_total: x['Actual Disbursements (PhP)_Total'],
						program_id: p ? p.id : null,
						subprogram_id: sp ? sp.id : null
					}
				})

				return recoded
			},
			data() {
				return this.$store.state.upload.data
			},
			errors() {
				return this.$store.state.upload.errors
			},
			meta() {
				return this.$store.state.upload.meta
			},
			columns() {
				const actionColumn = {
					name: 'actions',
					label: 'Actions'
				}

				if (this.data.length) {

					const sample = this.data[0]

					const columns = Object.keys(sample).map((x, index) => {
						return {
							name: x,
							label: x,
							field: x,
							align: 'left'
						}
					})

					return [...columns,actionColumn]
				}

				return []
			}
		},
		methods: {
			parse() {
				const file = this.file

				this.$store.dispatch('upload/parse', file)
			},
			saveRow(row) {
				console.log(row)
			},
			deleteSelected() {
				const selected = this.selected
				this.$store.dispatch('upload/deleteSelected', selected)
			},
			saveSelected() {
				const selected = this.selected
				// after saving, delete the selected items or add status saved?
				console.log(selected)
			}
		}
	}
</script>