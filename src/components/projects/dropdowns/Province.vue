<template>
  <single-select
    v-model="model"
    label="Province"
    :options="provinces"
    :rules="rules"
  />
</template>

<script>
import SingleSelect from '@/ui/form-inputs/SingleSelect';
import { FETCH_PROVINCES } from '@/graphql/queries';

export default {
  components: { SingleSelect },
  name: 'Province',
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
    provinces: {
      query: FETCH_PROVINCES
    }
  },
  data() {
    return {
      provinces: []
    };
  }
};
</script>
