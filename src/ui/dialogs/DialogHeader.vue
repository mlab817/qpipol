<template>
  <q-toolbar class="bg-black text-white">
    <q-toolbar-title class="absolute-center">
      {{ title }}
    </q-toolbar-title>
    <q-space />
    <q-btn flat round dense icon="close" @click="$emit('close')"></q-btn>
  </q-toolbar>
</template>

<script>
export default {
  name: 'DialogHeader',
  props: {
    title: String
  }
};
</script>
