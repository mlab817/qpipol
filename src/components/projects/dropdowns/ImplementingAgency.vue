<template>
  <single-select
    v-model="model"
    label="Implementing Agency"
    :options="operating_units"
    :rules="rules"
		:loading="$apollo.loading"
		with-refresh
		@refetch="refetch"
  />
</template>

<script>
import { SingleSelect } from 'src/ui';
import gql from "graphql-tag";

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
        query {
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
  },
	methods: {
  	refetch() {
  		this.$apollo.queries.operating_units.refetch()
		}
	}
};
</script>
