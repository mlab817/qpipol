<template>
  <single-select
    v-model="model"
    :label="label"
    :options="regions"
    :rules="rules"
    :readonly="readonly"
  />
</template>

<script>
import SingleSelect from '@/ui/form-inputs/SingleSelect';
import { FETCH_REGIONS } from '@/graphql/queries';

export default {
  components: { SingleSelect },
  name: 'Region',
  props: ['value', 'rules', 'label', 'readonly'],
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
    regions: {
      query: FETCH_REGIONS
    }
  },
  data() {
    return {
      regions: []
    };
  }
};
</script>
