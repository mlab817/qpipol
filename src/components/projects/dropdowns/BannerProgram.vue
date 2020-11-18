<template>
  <single-select
    v-model="model"
    label="Banner Program (if applicable)"
    :options="banner_programs"
    :rules="rules"
		with-refresh
		@refetch="refetch"
		:loading="$apollo.loading"
  />
</template>

<script>
import SingleSelect from '@/ui/form-inputs/SingleSelect';

import { BANNER_PROGRAMS } from '@/graphql/queries';

export default {
  components: { SingleSelect },
  name: 'BannerProgram',
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
    banner_programs: {
      query: BANNER_PROGRAMS
    }
  },
  data() {
    return {
      banner_programs: []
    };
  },
	methods: {
		refetch() {
			this.$apollo.queries.banner_programs.refetch()
		}
	}
};
</script>
