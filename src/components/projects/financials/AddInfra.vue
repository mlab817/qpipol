<template>
	<q-card style="max-width: 80wh; min-width: 400px;">
		<q-bar class="bg-accent text-white">
			<div>Add/Edit Funding Source</div>
			<q-space />
			<q-btn flat round dense icon="close" v-close-popup />
		</q-bar>

		<q-form @submit="handleSubmit">
			<q-card-section class="q-gutter-sm">
				<single-select
						label="Funding Source"
						v-model="infrastructureToSubmit.funding_source_id"
						:options="filteredItems"
						:rules="[val => !!val || '* Required']"
						:readonly="editMode"
				></single-select>

				<money-input
						label="2016 &amp; Prior"
						v-model="infrastructureToSubmit.infrastructure_target_2016"
				/>
				<money-input
						label="2017"
						v-model="infrastructureToSubmit.infrastructure_target_2017"
				/>
				<money-input
						label="2018"
						v-model="infrastructureToSubmit.infrastructure_target_2018"
				/>
				<money-input
						label="2019"
						v-model="infrastructureToSubmit.infrastructure_target_2019"
				/>
				<money-input
						label="2020"
						v-model="infrastructureToSubmit.infrastructure_target_2020"
				/>
				<money-input
						label="2021"
						v-model="infrastructureToSubmit.infrastructure_target_2021"
				/>
				<money-input
						label="2022"
						v-model="infrastructureToSubmit.infrastructure_target_2022"
				/>
				<money-input
						label="2023"
						v-model="infrastructureToSubmit.infrastructure_target_2023"
				/>
				<money-input
						label="2024"
						v-model="infrastructureToSubmit.infrastructure_target_2024"
				/>
				<money-input
						label="2025 &amp; Beyond"
						v-model="infrastructureToSubmit.infrastructure_target_2025"
				/>
				<money-input
						label="Total"
						:value="infrastructure_target_total"
						readonly
				/>

			</q-card-section>
			<q-card-actions align="right">
				<q-btn label="Cancel" flat v-close-popup color="primary"></q-btn>
				<q-btn label="Ok" flat type="submit" color="primary"></q-btn>
			</q-card-actions>
		</q-form>
	</q-card>
</template>

<script>
	import {
		MoneyInput,
		SingleSelect
	} from '@/ui'
	import { FETCH_FUNDING_SOURCES } from '../../../graphql/queries'
	import { projectService } from '../../../services'
	import { Notify } from 'quasar'

	export default {
		components: { MoneyInput, SingleSelect },
		props: ['infrastructureToEdit','taken','projectId','editMode'],
		name: 'AddInfra',
		apollo: {
			funding_sources: {
				query: FETCH_FUNDING_SOURCES
			}
		},
		computed: {
			filteredItems() {
				let items = this.funding_sources,
					taken = this.taken;

				// if in edit mode, show all
				if (this.infrastructureToSubmit.id) {
					return items;
				}

				// if in add mode, filter
				return items.filter(x => !taken.includes(x.id));
			},
			infrastructure_target_total() {
				const infrastructureToSubmit = this.infrastructureToSubmit

				console.log(infrastructureToSubmit)

				const remove = ['id','funding_source_id','project_id']

				return Object.keys(infrastructureToSubmit).filter(k => (remove.indexOf(k) === -1))
					.reduce((acc, value) => {
						console.log(acc, infrastructureToSubmit[value])
						acc += infrastructureToSubmit[value]
						return acc
					}, 0)
			}
		},
		data() {
			return {
				infrastructureToSubmit: {
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
				funding_sources: []
			}
		},
		methods: {
			handleSubmit() {
				const infrastructureToSubmit = this.infrastructureToSubmit,
					project_id = this.projectId;
				console.log(infrastructureToSubmit)

				this.$q.loading.show();

				if (infrastructureToSubmit.id) {
					// update
					projectService
						.updateFundingSourceInfrastructure(infrastructureToSubmit)
						.then(() => {
							this.$emit('close');
						})
						.catch(err => Notify.create({
							message: err.message
						}))
						.finally(() => this.$q.loading.hide());
				} else {
					// assign project id here
					const infrastructureToCreate = {
						funding_source_id: infrastructureToSubmit.funding_source_id,
						project_id: project_id,
						infrastructure_target_2016: infrastructureToSubmit.infrastructure_target_2016,
						infrastructure_target_2017: infrastructureToSubmit.infrastructure_target_2017,
						infrastructure_target_2018: infrastructureToSubmit.infrastructure_target_2018,
						infrastructure_target_2019: infrastructureToSubmit.infrastructure_target_2019,
						infrastructure_target_2020: infrastructureToSubmit.infrastructure_target_2020,
						infrastructure_target_2021: infrastructureToSubmit.infrastructure_target_2021,
						infrastructure_target_2022: infrastructureToSubmit.infrastructure_target_2022,
						infrastructure_target_2023: infrastructureToSubmit.infrastructure_target_2023,
						infrastructure_target_2024: infrastructureToSubmit.infrastructure_target_2024,
						infrastructure_target_2025: infrastructureToSubmit.infrastructure_target_2025,
						infrastructure_target_total: this.infrastructure_target_total
					}
					// create
					projectService
						.createFundingSourceInfrastructure(infrastructureToCreate)
						.then(() => {
							this.$emit('close');
						})
						.catch(err => Notify.create({
							message: err.message
						}))
						.finally(() => this.$q.loading.hide());
				}
			}
		},
		mounted() {
			this.infrastructureToSubmit = Object.assign({}, this.infrastructureToEdit)
			console.log(this.infrastructureToSubmit)
		}
	}
</script>
