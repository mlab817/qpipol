<template>
  <div class="col">
    <span class="text-caption text-weight-bold">{{ label }}</span>
    <q-input
      square
      v-model="model"
      :dense="dense"
      @input="val => $emit('input', val)"
      :readonly="readonly"
      :rules="rules"
      :hint="hint"
      clearable
      type="number"
      :suffix="suffix"
      outlined
      label-color="orange-10"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'NumberInput',
  props: ['label', 'value', 'readonly', 'rules', 'hint', 'suffix'],
  computed: {
    ...mapState('settings', ['dense'])
  },
  data() {
    return {
      model: null
    };
  },
  mounted() {
    this.model = this.value;
  }
};
</script>

<style>
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
