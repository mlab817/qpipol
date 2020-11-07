<template>
  <q-btn
    icon="help"
		:label="$q.screen.lt.md ? void 0: 'Help'"
		class="q-ml-sm"
    outline
		@click="$emit('click')">
		<q-tooltip v-if="tooltip">{{tooltip}}</q-tooltip>
	</q-btn>
</template>

<script>
export default {
  name: 'HelpButton',
	props: ['tooltip']
}
</script>
