<template>
  <single-select
    v-model="model"
    label="Budget Tier"
    :options="tiers"
    :rules="rules"
		with-refresh
		@refetch="refetch"
		:loading="$apollo.loading"
  />
</template>

<script>
import SingleSelect from '@/ui/form-inputs/SingleSelect';

import { FETCH_TIERS } from '@/graphql/queries';

export default {
  components: { SingleSelect },
  name: 'BudgetTier',
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
    tiers: {
      query: FETCH_TIERS
    }
  },
  data() {
    return {
      tiers: []
    };
  },
	methods: {
		refetch() {
			this.$apollo.queries.tiers.refetch()
		}
	}
};
</script>
