<template>
	<q-icon
			color="primary"
			name="refresh"
			class="cursor-pointer"
			@click="$emit('click')"
	>
		<q-tooltip>Refresh data</q-tooltip>
	</q-icon>
</template>

<script>
	export default {
		name: 'MiniRefresh'
	}
</script>
