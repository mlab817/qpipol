<template>
	<page-container>
		<template v-slot:title>
			<page-title title="Upload Program Activities">
				<q-btn
					icon="archive"
					label="Template"
					color="primary"
					@click="exportExcel"></q-btn>
				<help-button @click="showHelp" />
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
						<q-btn icon="delete" label="Delete" color="negative" :disable="!selected.length" @click="deleteSelected" />
						<q-btn icon="save" label="Save" color="primary" :disable="!selected.length" @click="updatePrexcActivities" />
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
        dataToSubmit: null
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
			},
			columns() {
				const actionColumn = {
					name: 'actions',
					label: 'Actions'
				}

				if (this.values.length) {

					const sample = this.values[0]
          const headers = this.$store.state.upload.headers

					const columns = Object.keys(sample).map((x, index) => {

						return {
							name: headers[index],
							label: headers[index] ? headers[index].toUpperCase().replace(/_/g," ") : index,
							field: row => row[x],
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
	      // this.$q.loading.show()
				console.log('export excel triggered')

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
			showHelp() {
				// show help
			},
			updatePrexcActivities() {
			  // remove unacceptable fields (subprogram, program and rename activity as name)
        const selected = this.selected.map(sel => {
          const { subprogram, program, saved, activity, ...otherFields } = sel
          return {
            ...otherFields,
            name: activity
          }
        })

        // prepare payload
				const payload = {
					operating_unit_id: this.$store.state.auth.user.operating_unit.id,
					update: selected
				}

				this.dataToSubmit = payload
        // run update
				// programService.updatePrexcActivities(payload)
				// 	.then(res => console.log(res))
				// 	.catch(err => console.log(err.message))
			}
		}
	}
</script>
