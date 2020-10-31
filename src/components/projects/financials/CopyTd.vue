<template>
  <q-input
    v-model="internalValue"
    input-class="text-right"
    dense
    readonly
    disable
    filled
  >
    <template v-slot:after>
      <q-btn
        flat
        round
        icon="content_copy"
        v-copy="value"
        color="blue"
        size="xs"
      >
        <q-tooltip>Copy to clipboard</q-tooltip>
      </q-btn>
    </template>
  </q-input>
</template>

<script>
export default {
  name: 'CopyTd',
  props: ['value'],
  computed: {
    internalValue: {
      get() {
        const value = this.$props.value;
        if (value) {
          return value.toLocaleString();
        }
        return 0;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  },
  filters: {
    formatMoney(val) {
      if (!val) {
        return 0.0;
      }
      return val.toLocaleString('en-GB', { maximumFractionDigits: 2 });
    }
  }
};
</script>
