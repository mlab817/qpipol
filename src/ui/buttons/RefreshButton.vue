<template>
  <q-btn icon="refresh" :label="$q.screen.lt.md ? void 0: 'Refresh'" outline class="q-ml-sm" @click="$emit('click')">
    <q-tooltip v-if="tooltip">{{tooltip}}</q-tooltip>
  </q-btn>
</template>

<script>
export default {
  name: 'RefreshButton',
	props: {
  	tooltip: {
  		type: String,
			default: 'Refresh'
		}
	}
};
</script>
