<template>
  <single-select
    v-model="model"
    :options="gads"
    label="GAD Classification"
    :rules="rules"
  ></single-select>
</template>

<script>
import { FETCH_GADS_QUERY } from '@/graphql/queries';
import SingleSelect from '@/ui/form-inputs/SingleSelect';

export default {
  components: { SingleSelect },
  name: 'Gad',
  props: ['value', 'rules'],
  apollo: {
    gads: {
      query: FETCH_GADS_QUERY
    }
  },
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
  data() {
    return {
      gads: []
    };
  }
};
</script>
