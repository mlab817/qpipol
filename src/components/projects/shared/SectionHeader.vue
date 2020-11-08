<template>
  <q-toolbar class="bg-secondary text-white">
    <q-toolbar-title>
      {{ sectionTitle }}
    </q-toolbar-title>
    <q-space />
    <slot></slot>
  </q-toolbar>
</template>

<script>
export default {
  name: 'SectionHeader',
  props: ['sectionTitle']
};
</script>
