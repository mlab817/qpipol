<template>
  <q-field
    outlined
    v-model="money"
    :label="label"
    :rules="rules"
		:dense="$q.screen.lt.md"
		:readonly="readonly"
  >
    <template v-slot:control="{ id, floatingLabel, value, emitValue }">
      <money
        :id="id"
        class="q-field__input text-right"
        :value="value"
        @input="emitValue"
        v-bind="moneyFormatForComponent"
        v-show="floatingLabel"
      />
    </template>
  </q-field>
</template>

<script>
export default {
  name: 'MoneyInput',
  props: ['label', 'value', 'rules','readonly'],
  data() {
    return {
      moneyFormatForComponent: {
        decimal: '.',
        thousands: ',',
        prefix: '',
        suffix: '',
        precision: 2,
        masked: false
      }
    };
  },
  computed: {
    money: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  }
};
</script>
