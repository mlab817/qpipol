<template>
  <q-item clickable v-close-popup :to="to" @click="$emit('click')" :type="type ? type : void 0" :target="target ? target : void 0">
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
  props: ['icon', 'to', 'label', 'type', 'target']
};
</script>
