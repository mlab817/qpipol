<template>
  <single-select
    v-model="model"
    label="Implementation Mode"
    :options="implementation_modes"
    :rules="rules"
  />
</template>

<script>
import SingleSelect from '@/ui/form-inputs/SingleSelect';
import { FETCH_IMPLEMENTATION_MODES } from '@/graphql/queries';

export default {
  components: { SingleSelect },
  name: 'ImplementationMode',
  props: ['value', 'rules'],
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
    implementation_modes: {
      query: FETCH_IMPLEMENTATION_MODES
    }
  },
  data() {
    return {
      implementation_modes: []
    };
  }
};
</script>
