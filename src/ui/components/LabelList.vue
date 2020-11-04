<template>
	<q-item>
		<q-item-section class="col-2">
			<q-item-label>{{ label }}:</q-item-label>
		</q-item-section>
		<q-item-section>
			<q-item-label>
				<template v-if="value && value.length">
					<q-chip v-for="(item, index) in value" :key="index">
						{{ typeof item === 'object' ? item.name : item }}
					</q-chip>
				</template>
				<span v-else>
					None selected.
				</span>
			</q-item-label>
		</q-item-section>
	</q-item>
</template>

<script>
	export default {
		name: 'LabelList',
		props: {
			label: String,
			value: Array
		}
	}
</script>
