<template>
	<single-select
		v-model="model"
		:label="label"
		:options="options"
		:rules="rules"
		:loading="$apollo.loading"
		with-refresh
		@refetch="refetch"
	></single-select>
</template>

<script>
	import {FETCH_YEARS} from '../../../graphql/queries'
	import SingleSelect from '../../../ui/form-inputs/SingleSelect'

	export default {
		components: { SingleSelect },
		name: 'Years',
		props: ['label','rules','value','minValue'],
		apollo: {
			years: {
				query: FETCH_YEARS
			}
		},
		computed: {
			options() {
				if (typeof this.minValue === 'undefined') {
					return this.years
				}
				return this.years.filter(y => (parseInt(y.id) >= parseInt(this.minValue)))
			},
			model: {
				get() {
					return this.$props.value;
				},
				set(val) {
					this.$emit('input', val);
				}
			}
		},
		data() {
			return {
				years: []
			};
		},
		methods: {
			refetch() {
				this.$apollo.queries.years.refetch()
			}
		}
	}
</script>
