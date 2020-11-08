<template>
	<q-btn
			flat
			round
			icon="delete"
			color="negative"
			@click.stop="$emit('click')"
	>
		<q-tooltip>Delete</q-tooltip>
	</q-btn>
</template>

<script>
	export default {
		name: 'DeleteButton',
	}
</script>
