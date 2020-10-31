<template>
  <q-btn
    icon="edit"
    color="secondary"
    flat
    round
    dense
    size="sm"
    @click="$emit('click')"
  />
</template>

<script>
export default {
  name: 'EditButton'
};
</script>
