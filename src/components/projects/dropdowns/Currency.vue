<template>
  <single-select
    v-model="model"
    label="Currency"
    :options="currencies"
    :rules="rules"
  />
</template>

<script>
import SingleSelect from '@/ui/form-inputs/SingleSelect';
import { FETCH_CURRENCIES } from '@/graphql/queries';

export default {
  components: { SingleSelect },
  name: 'Currency',
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
    currencies: {
      query: FETCH_CURRENCIES
    }
  },
  data() {
    return {
      currencies: []
    };
  }
};
</script>
