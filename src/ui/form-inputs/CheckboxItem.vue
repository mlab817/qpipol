<template>
  <q-item tag="label" v-ripple>
    <q-item-section avatar>
      <q-checkbox
        v-model="model"
        :dense="dense"
        :hint="hint"
        @input="handleInput"
        stack-label
        outlined
        readonly
        color="secondary"
        :val="true"
      >
      </q-checkbox>
    </q-item-section>
    <q-item-section>
      <q-item-label>
        {{ label }}
      </q-item-label>
      <q-item-label caption>
        {{ description }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'CheckboxItem',
  props: {
    label: String,
    hint: String,
    description: String,
    dense: {
      type: Boolean,
      default: false
    },
    value: Boolean
  },
  data() {
    return {
      model: null
    };
  },
  methods: {
    handleInput() {
      this.$emit('input', this.model);
    }
  },
  mounted() {
    this.model = this.value;
  }
};
</script>
