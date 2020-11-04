<template>
	<q-btn
			label="Add"
			icon="add"
			color="primary"
			@click="$emit('click')"
	></q-btn>
</template>

<script>
	export default {
		name: 'PlusButton'
	};
</script>
