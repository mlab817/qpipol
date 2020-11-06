<template>
	<q-icon
			name="refresh"
			class="cursor-pointer"
			@click="$emit('click')"
	></q-icon>
</template>

<script>
	export default {
		name: 'MiniRefresh'
	}
</script>
