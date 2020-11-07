<template>
	<q-btn
			flat
			round
			color="primary"
			icon="restore_from_trash"
			@click="$emit('click')"
	>
		<q-tooltip>Restore</q-tooltip>
	</q-btn>
</template>

<script>
	export default {
		name: 'RestoreButton'
	}
</script>
