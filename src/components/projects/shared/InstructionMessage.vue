<template>
  <div class="row q-pa-md">
    <q-item-label caption>
      <span class="text-weight-bold" v-if="!!type">{{ type + ': ' }}</span>
      <slot></slot>
      {{ message }}
    </q-item-label>
  </div>
</template>

<script>
export default {
  name: 'InstructionMessage',
  props: ['type', 'message']
};
</script>
