<template>
  <single-select
    v-model="model"
    label="Program (if applicable)"
    :options="prexc_programs"
    :rules="rules"
		with-refresh
		@refetch="refetch"
		:loading="$apollo.loading"
  />
</template>

<script>
import SingleSelect from '@/ui/form-inputs/SingleSelect';

import { PREXC_PROGRAMS } from '@/graphql/queries';

export default {
  components: { SingleSelect },
  name: 'PrexcPrograms',
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
    prexc_programs: {
      query: PREXC_PROGRAMS
    }
  },
  data() {
    return {
      prexc_programs: []
    };
  },
	methods: {
		refetch() {
			this.$apollo.queries.prexc_programs.refetch()
		}
	}
};
</script>
