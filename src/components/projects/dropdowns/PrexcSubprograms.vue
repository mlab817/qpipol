<template>
  <single-select
    label="Subprogram"
    v-model="model"
    :options="filtered_prexc_subprograms"
    :rules="rules"
    with-refresh
		@refetch="refetch"
		:loading="$apollo.loading"
  ></single-select>
</template>

<script>
import SingleSelect from '@/ui/form-inputs/SingleSelect';

import { PREXC_SUBPROGRAMS } from '@/graphql/queries';

export default {
  components: { SingleSelect },
  name: 'PrexcSubprograms',
  props: ['value', 'rules', 'filter'],
  computed: {
    filtered_prexc_subprograms() {
      const subprograms = this.prexc_subprograms;
      if (!this.filter) {
        return [{ id: null, name: 'Select program first' }];
      }
      return subprograms.filter(
        x => x.prexc_program_id === this.filter
      );
    },
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
    prexc_subprograms: {
      query: PREXC_SUBPROGRAMS
    }
  },
  data() {
    return {
      prexc_subprograms: []
    };
  },
	methods: {
		refetch() {
			this.$apollo.queries.prexc_subprograms.refetch()
		}
	}
};
</script>
