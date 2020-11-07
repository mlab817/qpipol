<template>
	<q-btn
			flat
			round
			:icon="inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
			@click="$emit('click')"
	>
		<q-tooltip>Enter fullscreen mode</q-tooltip>
	</q-btn>
</template>

<script>
	export default {
		name: 'FullscreenButton',
		props: ['inFullscreen']
	}
</script>
