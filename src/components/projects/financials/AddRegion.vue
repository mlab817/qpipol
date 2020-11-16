<template>
	<q-card :style="$q.screen.gt.xs ? 'min-width:400px' : ''">
		<card-header
				title="Add/Edit Region"
		></card-header>

		<q-form @submit="handleSubmit">
			<q-card-section class="q-gutter-sm">
				<single-select
					label="Region"
					v-model="investmentToSubmit.region_id"
					:options="filteredItems"
					:rules="[val => !!val || '* Required']"
					:readonly="editMode"
				></single-select>

				<money-input
						label="2016 &amp; Prior"
						v-model="investmentToSubmit.investment_target_2016"
				/>
				<money-input
						label="2017"
						v-model="investmentToSubmit.investment_target_2017"
				/>
				<money-input
						label="2018"
						v-model="investmentToSubmit.investment_target_2018"
				/>
				<money-input
						label="2019"
						v-model="investmentToSubmit.investment_target_2019"
				/>
				<money-input
						label="2020"
						v-model="investmentToSubmit.investment_target_2020"
				/>
				<money-input
						label="2021"
						v-model="investmentToSubmit.investment_target_2021"
				/>
				<money-input
						label="2022"
						v-model="investmentToSubmit.investment_target_2022"
				/>
				<money-input
						label="2023"
						v-model="investmentToSubmit.investment_target_2023"
				/>
				<money-input
						label="2024"
						v-model="investmentToSubmit.investment_target_2024"
				/>
				<money-input
						label="2025 &amp; Beyond"
						v-model="investmentToSubmit.investment_target_2025"
				/>
				<money-input
						label="Total"
						:value="investment_target_total"
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
	import {FETCH_REGIONS} from '../../../graphql/queries'
	import { projectService } from '../../../services'
	import { Notify } from 'quasar'
	import CardHeader from '../../../ui/cards/CardHeader'

	export default {
		components: {CardHeader, MoneyInput, SingleSelect },
		props: ['investmentToEdit','taken','projectId','editMode'],
		name: 'AddRegion',
		apollo: {
			regions: {
				query: FETCH_REGIONS
			}
		},
		computed: {
			filteredItems() {
				let items = this.regions,
					taken = this.taken;

				// if in edit mode, show all
				if (this.investmentToSubmit.id) {
					return items;
				}

				// if in add mode, filter
				return items.filter(x => !taken.includes(x.id));
			},
			investment_target_total() {
				const investmentToSubmit = this.investmentToSubmit

				console.log(investmentToSubmit)

				const remove = ['id','region_id','project_id']

				return Object.keys(investmentToSubmit).filter(k => (remove.indexOf(k) === -1))
					.reduce((acc, value) => {
						console.log(acc, investmentToSubmit[value])
						acc += investmentToSubmit[value]
						return acc
					}, 0)
			}
		},
		data() {
			return {
				investmentToSubmit: {
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
				regions: []
			}
		},
		methods: {
			handleSubmit() {
				const investmentToSubmit = this.investmentToSubmit,
					project_id = this.projectId;
				console.log(investmentToSubmit)

				this.$q.loading.show();

				if (investmentToSubmit.id) {
					investmentToSubmit.investment_target_total = (investmentToSubmit.investment_target_2016 +
						investmentToSubmit.investment_target_2017 +
						investmentToSubmit.investment_target_2018 +
						investmentToSubmit.investment_target_2019 +
						investmentToSubmit.investment_target_2020 +
						investmentToSubmit.investment_target_2021 +
						investmentToSubmit.investment_target_2022 +
						investmentToSubmit.investment_target_2023 +
						investmentToSubmit.investment_target_2024 +
						investmentToSubmit.investment_target_2025)
					// update
					projectService
						.updateRegionFinancial(investmentToSubmit)
						.then(() => {
							this.$emit('close');
						})
						.catch(err => Notify.create({
							message: err.message
						}))
						.finally(() => this.$q.loading.hide());
				} else {
					// assign project id here
					const investmentToCreate = {
						region_id: investmentToSubmit.region_id,
						project_id: project_id,
						investment_target_2016: investmentToSubmit.investment_target_2016,
						investment_target_2017: investmentToSubmit.investment_target_2017,
						investment_target_2018: investmentToSubmit.investment_target_2018,
						investment_target_2019: investmentToSubmit.investment_target_2019,
						investment_target_2020: investmentToSubmit.investment_target_2020,
						investment_target_2021: investmentToSubmit.investment_target_2021,
						investment_target_2022: investmentToSubmit.investment_target_2022,
						investment_target_2023: investmentToSubmit.investment_target_2023,
						investment_target_2024: investmentToSubmit.investment_target_2024,
						investment_target_2025: investmentToSubmit.investment_target_2025,
						investment_target_total: this.investment_target_total
					}
					// create
					projectService
						.createRegionFinancial(investmentToCreate)
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
			this.investmentToSubmit = Object.assign({}, this.investmentToEdit)
			console.log(this.investmentToSubmit)
		}
	}
</script>
