<template>
  <q-btn flat round icon="archive" @click="$emit('click')" :label="$q.screen.lt.md ? void 0: 'Download'">
    <q-tooltip v-if="tooltip">{{tooltip}}</q-tooltip>
  </q-btn>
</template>

<script>
export default {
  name: 'DownloadButton',
	props: ['tooltip']
};
</script>
