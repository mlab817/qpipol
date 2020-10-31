<template>
  <q-input
    square
    v-model="model"
    mask="date"
    :label="label"
    :dense="dense"
    :hint="hint"
    stack-label
    outlined
    label-color="secondary"
    :rules="rules"
    :disable="disable"
    type="date"
    clearable
  >
    <template v-slot:prepend>
      <q-icon name="event" color="secondary" />
    </template>
  </q-input>
</template>

<script>
import { mapState } from 'vuex';

// This is a template for date inputs
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
