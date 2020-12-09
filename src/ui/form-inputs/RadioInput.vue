<template>
  <q-field
    :rules="rules"
    stack-label
    :label="label"
    v-model="model"
    borderless
    hide-bottom-space
  >
    <template v-slot:control>
      <q-option-group
        type="radio"
        :options="recodedOptions"
        v-model="model"
      >
      </q-option-group>
    </template>
  </q-field>
</template>

<script>
export default {
  name: 'RadioInput',
  props: ['value', 'options', 'label', 'recode', 'rules'],
  computed: {
    model: {
      get() {
        return this.$props.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    },
    recodedOptions() {
      const options = this.$props.options;
      const recode = this.$props.recode;

      if (recode) {
        let recodedOptions = [];

        recodedOptions = options.map(obj => {
          let newObject = {};
          newObject['label'] = obj.name;
          newObject['value'] = obj.id;
          return newObject;
        });

        return recodedOptions;
      }

      return options;
    }
  }
};
</script>
