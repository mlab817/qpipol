<template>
  <single-select
    v-model="model"
    label="Implementing Agency"
    :options="operating_units"
    :rules="rules"
    hint="Determined based on the user's indicated operating unit/office"
    :readonly="readonly"
  />
</template>

<script>
import gql from 'graphql-tag';
import SingleSelect from '@/ui/form-inputs/SingleSelect';

export default {
  components: { SingleSelect },
  name: 'OperatingUnit',
  props: ['value', 'rules', 'readonly'],
  computed: {
    model: {
      get() {
        return this.$props.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  },
  apollo: {
    operating_units: {
      query: gql`
        {
          operating_units {
            id
            name
          }
        }
      `
    }
  },
  data() {
    return {
      operating_units: []
    };
  }
};
</script>
