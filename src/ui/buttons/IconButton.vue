<template>
	<q-btn :icon="icon" flat round @click="$emit('click')" :disabled="disabled" :size="size" :color="color">
		<q-tooltip v-if="tooltip">{{tooltip}}</q-tooltip>
	</q-btn>
</template>

<script>
	export default {
		name: 'IconButton',
		props: ['icon', 'tooltip', 'disabled', 'size', 'color']
	}
</script>
