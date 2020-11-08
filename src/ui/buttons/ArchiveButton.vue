<template>
	<q-btn outline icon="archive" @click="$emit('click')" :label="$q.screen.lt.md ? void 0: 'Download'">
		<q-tooltip v-if="tooltip">{{tooltip}}</q-tooltip>
	</q-btn>
</template>

<script>
	export default {
		name: 'ArchiveButton',
		props: {
			tooltip: {
				type: String,
				default: 'Download'
			}
		}
	}
</script>
