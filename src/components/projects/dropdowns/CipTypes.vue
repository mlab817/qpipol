<template>
  <single-select
    label="CIP Type"
    v-model="selected"
    :options="cip_types"
    :rules="rules"
		with-refresh
		@refetch="refetch"
		:loading="$apollo.loading"
  ></single-select>
</template>

<script>
import { CIP_TYPES_QUERY } from 'src/graphql';
import SingleSelect from '@/ui/form-inputs/SingleSelect';

export default {
  components: { SingleSelect },
  name: 'CipType',
  props: ['value','rules'],
  apollo: {
    cip_types: {
      query: CIP_TYPES_QUERY
    }
  },
  data() {
    return {
      cip_types: []
    };
  },
  computed: {
    selected: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  },
	methods: {
  	refetch() {
  		this.$apollo.queries.cip_types.refetch()
		}
	}
};
</script>
