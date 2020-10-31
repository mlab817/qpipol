<template>
  <div class="col">
    <div class="row text-caption text-weight-bold items-center justify-between">
      {{ label }}
    </div>
    <q-input
      square
      v-model="model"
      :type="type"
      :dense="dense"
      outlined
      :readonly="readonly"
      :rules="rules"
      :max-length="maxlength"
      :hint="hint"
      clearable
      label-color="orange-10"
      hide-bottom-space
      :mask="mask"
      :placeholder="placeholder"
    >
      <template v-slot:append>
        <q-btn
          v-if="withNa"
          flat
          label="N/A"
          @click="model = 'N/A'"
          color="red"
        ></q-btn>
      </template>
    </q-input>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'TextInput',
  props: {
    type: String,
    label: String,
    value: [String, Number],
    readonly: Boolean,
    rules: Array,
    maxlength: Number,
    hint: String,
    mask: String,
    placeholder: String,
    withNa: {
      type: Boolean,
      default: false
    }
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
    },
    na: {
      get() {
        if (this.model && this.model.toLowerCase() === 'N/A') {
          return true;
        } else {
          return false;
        }
      }
    }
  }
};
</script>

<style>
.q-textarea .q-field__native {
  resize: none;
}
</style>
