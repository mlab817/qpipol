<template>
	<q-item>
		<q-item-section class="col-2">
			<q-item-label>{{ label }}:</q-item-label>
		</q-item-section>
		<q-item-section>
			<textarea-copy :value="renderValue"></textarea-copy>
			<slot></slot>
		</q-item-section>
	</q-item>
</template>

<script>
	import TextareaCopy from '../../components/projects/shared/TextareaCopy'

	export default {
		name: 'LabelValue',
		components: {TextareaCopy},
		props: {
			label: String,
			value: [String, Number, Object, Boolean]
		},
		computed: {
			renderValue() {
				const value = this.value
				let renderValue


				// if value is not null or undefined
				// return appropriate value
				if (value !== null && value !== undefined) {
					if (typeof value === 'string') {
						renderValue = value
					} else if (typeof value === 'object') {
						renderValue =  value.name
					} else if (typeof value === 'boolean') {
						renderValue = !value ? 'No' : 'Yes'
					}
				} else {
					renderValue = ''
				}
				console.info(`${value} : ${typeof value} render ${renderValue}`)
				return renderValue
			}
		}
	}
</script>
