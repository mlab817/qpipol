<template>
  <q-input
    square
    v-model="model"
    mask="date"
    :label="label"
    :dense="$q.screen.lt.md"
    :hint="hint"
    stack-label
    outlined
    :rules="rules"
    :disable="disable"
    type="date"
    clearable
  />
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'DateInput',
  props: {
    label: String,
    hint: String,
    value: String,
    rules: Array,
    disable: Boolean
  },
  computed: {
    ...mapState('settings', ['dense']),
    model: {
      get() {
        return this.$props.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  }
};
</script>
