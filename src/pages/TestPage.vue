<template>
	<page-container>
		<template v-slot:title>
			<page-title title="Upload Program Activities">
				<q-btn
					icon="archive"
					label="Template"
					color="primary"
					@click="exportExcel"></q-btn>
				<help-button />
			</page-title>
		</template>

		<q-file stack-label outlined label="Choose your CSV file here" v-model="file" accept=".csv" clearable>
			<template v-slot:append>
        <q-btn round dense flat icon="send" @click="parse" :disable="!file" />
      </template>
		</q-file>

		<div class="row q-my-md" v-if="values.length">
			<q-table
				class="col"
				title="Preview"
				:data="values"
				wrap-cells
				:columns="columns"
				selection="multiple"
				row-key="id"
				:selected.sync="selected"
				:filter="filter"
				style="margin-bottom: 70px"
				>
				<template v-slot:top-right>
					<div class="row q-gutter-sm">
						<search v-model="filter" />
						<q-btn icon="delete" label="Delete" color="negative" :disable="!selected.length" @click="deleteSelected">
							<q-tooltip>This will only delete items in the preview and exclude them from submission.</q-tooltip>
						</q-btn>
						<q-btn icon="save" label="Save" color="primary" :disable="!selected.length" @click="confirmUpdate" />
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

    <pre>{{dataToSubmit}}</pre>

	</page-container>
</template>

<script>
	import {
		PageContainer,
		PageTitle,
		Search,
		HelpButton
	} from '@/ui'
	import {
		PREXC_PROGRAMS,
		PREXC_SUBPROGRAMS
	} from '@/graphql'
	import {
		programService
	} from '@/services'
  import {openURL} from "quasar";

	export default {
		components: {
			PageContainer,
			PageTitle,
			Search,
			HelpButton
		},
		name: 'PageTest',
		data() {
			return {
				file: null,
				selected: [],
				prexc_programs: [],
				prexc_subprograms: [],
				filter: '',
        dataToSubmit: null,
				columns: [
					{ name: 'id' , label: 'ID' , field: 'id' },
					{ name: 			'program' , label: 			'PROGRAM' , field: 			'program' },
					{ name: 			'subprogram' , label: 			'SUBPROGRAM' , field: 			'subprogram' },
					{ name: 			'activity' , label: 			'ACTIVITY' , field: 			'activity' },
					{ name: 			'uacs_code' , label: 			'UACS CODE' , field: 			'uacs_code' },
					{ name: 			'infrastructure_target_2016' , label: 			'INFRASTRUCTURE TARGET 2016' , field: 			'infrastructure_target_2016' },
					{ name: 			'infrastructure_target_2017' , label: 			'INFRASTRUCTURE TARGET 2017' , field: 			'infrastructure_target_2017' },
					{ name: 			'infrastructure_target_2018' , label: 			'INFRASTRUCTURE TARGET 2018' , field: 			'infrastructure_target_2018' },
					{ name: 			'infrastructure_target_2019' , label: 			'INFRASTRUCTURE TARGET 2019' , field: 			'infrastructure_target_2019' },
					{ name: 			'infrastructure_target_2020' , label: 			'INFRASTRUCTURE TARGET 2020' , field: 			'infrastructure_target_2020' },
					{ name: 			'infrastructure_target_2021' , label: 			'INFRASTRUCTURE TARGET 2021' , field: 			'infrastructure_target_2021' },
					{ name: 			'infrastructure_target_2022' , label: 			'INFRASTRUCTURE TARGET 2022' , field: 			'infrastructure_target_2022' },
					{ name: 			'infrastructure_target_2023' , label: 			'INFRASTRUCTURE TARGET 2023' , field: 			'infrastructure_target_2023' },
					{ name: 			'infrastructure_target_2024' , label: 			'INFRASTRUCTURE TARGET 2024' , field: 			'infrastructure_target_2024' },
					{ name: 			'infrastructure_target_2025' , label: 			'INFRASTRUCTURE TARGET 2025' , field: 			'infrastructure_target_2025' },
					{ name: 			'infrastructure_target_total' , label: 			'INFRASTRUCTURE TARGET TOTAL' , field: 			'infrastructure_target_total' },
					{ name: 			'investment_target_2016' , label: 			'INVESTMENT TARGET 2016' , field: 			'investment_target_2016' },
					{ name: 			'investment_target_2017' , label: 			'INVESTMENT TARGET 2017' , field: 			'investment_target_2017' },
					{ name: 			'investment_target_2018' , label: 			'INVESTMENT TARGET 2018' , field: 			'investment_target_2018' },
					{ name: 			'investment_target_2019' , label: 			'INVESTMENT TARGET 2019' , field: 			'investment_target_2019' },
					{ name: 			'investment_target_2020' , label: 			'INVESTMENT TARGET 2020' , field: 			'investment_target_2020' },
					{ name: 			'investment_target_2021' , label: 			'INVESTMENT TARGET 2021' , field: 			'investment_target_2021' },
					{ name: 			'investment_target_2022' , label: 			'INVESTMENT TARGET 2022' , field: 			'investment_target_2022' },
					{ name: 			'investment_target_2023' , label: 			'INVESTMENT TARGET 2023' , field: 			'investment_target_2023' },
					{ name: 			'investment_target_2024' , label: 			'INVESTMENT TARGET 2024' , field: 			'investment_target_2024' },
					{ name: 			'investment_target_2025' , label: 			'INVESTMENT TARGET 2025' , field: 			'investment_target_2025' },
					{ name: 			'investment_target_total' , label: 			'INVESTMENT TARGET TOTAL' , field: 			'investment_target_total' },
					{ name: 			'nep_2016' , label: 			'NEP 2016' , field: 			'nep_2016' },
					{ name: 			'nep_2017' , label: 			'NEP 2017' , field: 			'nep_2017' },
					{ name: 			'nep_2018' , label: 			'NEP 2018' , field: 			'nep_2018' },
					{ name: 			'nep_2019' , label: 			'NEP 2019' , field: 			'nep_2019' },
					{ name: 			'nep_2020' , label: 			'NEP 2020' , field: 			'nep_2020' },
					{ name: 			'nep_2021' , label: 			'NEP 2021' , field: 			'nep_2021' },
					{ name: 			'nep_2022' , label: 			'NEP 2022' , field: 			'nep_2022' },
					{ name: 			'nep_2023' , label: 			'NEP 2023' , field: 			'nep_2023' },
					{ name: 			'nep_2024' , label: 			'NEP 2024' , field: 			'nep_2024' },
					{ name: 			'nep_2025' , label: 			'NEP 2025' , field: 			'nep_2025' },
					{ name: 			'nep_total' , label: 			'NEP TOTAL' , field: 			'nep_total' },
					{ name: 			'gaa_2016' , label: 			'GAA 2016' , field: 			'gaa_2016' },
					{ name: 			'gaa_2017' , label: 			'GAA 2017' , field: 			'gaa_2017' },
					{ name: 			'gaa_2018' , label: 			'GAA 2018' , field: 			'gaa_2018' },
					{ name: 			'gaa_2019' , label: 			'GAA 2019' , field: 			'gaa_2019' },
					{ name: 			'gaa_2020' , label: 			'GAA 2020' , field: 			'gaa_2020' },
					{ name: 			'gaa_2021' , label: 			'GAA 2021' , field: 			'gaa_2021' },
					{ name: 			'gaa_2022' , label: 			'GAA 2022' , field: 			'gaa_2022' },
					{ name: 			'gaa_2023' , label: 			'GAA 2023' , field: 			'gaa_2023' },
					{ name: 			'gaa_2024' , label: 			'GAA 2024' , field: 			'gaa_2024' },
					{ name: 			'gaa_2025' , label: 			'GAA 2025' , field: 			'gaa_2025' },
					{ name: 			'gaa_total' , label: 			'GAA TOTAL' , field: 			'gaa_total' },
					{ name: 			'disbursement_2016' , label: 			'DISBURSEMENT 2016' , field: 			'disbursement_2016' },
					{ name: 			'disbursement_2017' , label: 			'DISBURSEMENT 2017' , field: 			'disbursement_2017' },
					{ name: 			'disbursement_2018' , label: 			'DISBURSEMENT 2018' , field: 			'disbursement_2018' },
					{ name: 			'disbursement_2019' , label: 			'DISBURSEMENT 2019' , field: 			'disbursement_2019' },
					{ name: 			'disbursement_2020' , label: 			'DISBURSEMENT 2020' , field: 			'disbursement_2020' },
					{ name: 			'disbursement_2021' , label: 			'DISBURSEMENT 2021' , field: 			'disbursement_2021' },
					{ name: 			'disbursement_2022' , label: 			'DISBURSEMENT 2022' , field: 			'disbursement_2022' },
					{ name: 			'disbursement_2023' , label: 			'DISBURSEMENT 2023' , field: 			'disbursement_2023' },
					{ name: 			'disbursement_2024' , label: 			'DISBURSEMENT 2024' , field: 			'disbursement_2024' },
					{ name: 			'disbursement_2025' , label: 			'DISBURSEMENT 2025' , field: 			'disbursement_2025' },
					{ name: 			'disbursement_total', label: 			'DISBURSEMENT TOTAL', field: 			'disbursement_total'},

				]
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
			values() {
				return this.$store.state.upload.data
			},
			errors() {
				return this.$store.state.upload.errors
			},
			meta() {
				return this.$store.state.upload.meta
			}
		},
		methods: {
			parse() {
				const file = this.file

				this.$store.dispatch('upload/parse', file)
			},
			saveRow(row) {
				// this.updatePrexcActivities()
				// console.log(row)
				console.log('ou_id', this.$store.state.auth.user.operating_unit.id)
			},
			deleteSelected() {
				const selected = this.selected
				this.$store.dispatch('upload/deleteSelected', selected)
        this.selected = []
			},
			saveSelected() {
				const selected = this.selected
				// after saving, delete the selected items or add status saved?
				console.log(selected)
				console.log('ou_id', this.$store.state.auth.user.operating_unit.id)
			},
			exportExcel() {
	      this.$q.loading.show('This may take a while as we retrieve the data and generate the file.')
				// console.log('export excel triggered')

	      programService
	        .exportExcel()
	        .then(({ exportExcel }) => {
	          this.$q.dialog({
	            title: 'File Generate',
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
	    },
			confirmUpdate() {
				this.$q.dialog({
					title: 'Confirm Update',
					message: 'Are you sure you want to update the selected activities? Type <strong>YES</strong> to confirm. <br/><br/> Note: Changes in the Program and Subprogram will not be saved. Use the edit activity feature to update these information.',
					html: true,
					cancel: true,
					prompt: {
						model: '',
						isValid: val => val && val.toLowerCase() === 'yes'
					}
				}).onOk(() => this.updatePrexcActivities())
			},
			updatePrexcActivities() {
				const selected = [...this.selected].map(sel => {
          const { subprogram, program, saved, activity, ...otherFields } = sel
          return {
            ...otherFields,
            name: activity
          }
        })

				const payload = {
					id: this.$store.state.auth.user.operating_unit.id,
					prexc_activities: {
						update: selected
					}
				}

				this.$q.loading.show({
					message: 'This may take a while as we update multiple activities'
				})
        // run update

				programService.updatePrexcActivities(payload)
					.then(res => {
						console.log(res)
						this.$store.dispatch('upload/deleteSelected', this.selected)
							.then(() => (this.selected = []))
					})
					.catch(err => console.log(err.message))
					.finally(() => {
						this.$q.notify({
							type: 'positive',
							message: 'Success'
						})
						this.$q.loading.hide()
					})
			}
		}
	}
</script>
