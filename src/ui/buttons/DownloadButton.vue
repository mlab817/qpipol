<template>
  <q-btn flat round icon="archive" @click="$emit('click')">
    <q-tooltip>Download this table</q-tooltip>
  </q-btn>
</template>

<script>
export default {
  name: 'DownloadButton'
};
</script>
