<template>
  <single-select
    v-model="model"
    label="Implementing Agency"
    :options="operating_units"
    :rules="rules"
    hint="Determined based on the user's indicated operating unit/office"
  />
</template>

<script>
import SingleSelect from '@/ui/form-inputs/SingleSelect';
import {FETCH_OPERATING_UNITS} from '../../../graphql/queries'

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
      query: FETCH_OPERATING_UNITS
    }
  },
  data() {
    return {
      operating_units: []
    };
  }
};
</script>
