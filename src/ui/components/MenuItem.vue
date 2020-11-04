<template>
  <q-item clickable v-close-popup :to="to">
    <q-item-section avatar>
      <q-avatar>
        <q-icon :name="icon" />
      </q-avatar>
    </q-item-section>
    <q-item-section>{{ label }}</q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'MenuItem',
  props: ['icon', 'to', 'label']
};
</script>
