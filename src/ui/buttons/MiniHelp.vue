<template>
	<q-icon
		name="help_outline"
		class="cursor-pointer"
		@click="$emit('click')"
	></q-icon>
</template>

<script>
	export default {
		name: 'MiniHelp'
	}
</script>
