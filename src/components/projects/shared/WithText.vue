<template>
  <div class="column q-pa-sm">
    <div class="text-weight-lighter text-subtitle1">
      {{ label }}
    </div>
    <div class="row text-body2">
      <div class="col">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WithText',
  props: ['label']
};
</script>
