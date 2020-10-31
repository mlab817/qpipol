<template>
  <q-card-section class="row">
    <div class="text-h6">{{ title }}</div>
    <q-space />
    <q-btn flat round dense icon="close" v-close-popup></q-btn>
  </q-card-section>
</template>

<script>
export default {
  name: 'CardHeader',
  props: ['title']
};
</script>
