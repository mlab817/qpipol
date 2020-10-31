<template>
  <single-select
    v-model="model"
    label="Spatial Coverage"
    :options="spatial_coverages"
    :rules="rules"
    lazy-rules
  />
</template>

<script>
import SingleSelect from '@/ui/form-inputs/SingleSelect';
import { FETCH_SPATIAL_COVERAGES } from '@/graphql';

export default {
  components: { SingleSelect },
  name: 'SpatialCoverage',
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
    spatial_coverages: {
      query: FETCH_SPATIAL_COVERAGES
    }
  },
  data() {
    return {
      spatial_coverages: []
    };
  }
};
</script>
