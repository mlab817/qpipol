<template>
  <single-select
    v-model="model"
    label="City/Municipality"
    :options="city_municipalities"
    :rules="rules"
  />
</template>

<script>
import SingleSelect from '@/ui/form-inputs/SingleSelect';
import { FETCH_CITY_MUNICIPALITIES_QUERY } from '@/graphql/queries';

export default {
  components: { SingleSelect },
  name: 'CityMunicipality',
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
    city_municipalities: {
      query: FETCH_CITY_MUNICIPALITIES_QUERY
    }
  },
  data() {
    return {
      city_municipalities: []
    };
  }
};
</script>
