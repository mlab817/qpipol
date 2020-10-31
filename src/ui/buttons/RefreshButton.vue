<template>
  <q-btn flat round icon="refresh" @click="$emit('click')">
    <q-tooltip>Refetch projects</q-tooltip>
  </q-btn>
</template>

<script>
export default {
  name: 'RefreshButton'
};
</script>
