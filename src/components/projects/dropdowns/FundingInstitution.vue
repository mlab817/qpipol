<template>
  <single-select
    v-model="model"
    label="Funding Institution"
    :options="funding_institutions"
    :rules="rules"
  />
</template>

<script>
import SingleSelect from '@/ui/form-inputs/SingleSelect';
import { FETCH_FUNDING_INSTITUTIONS } from '@/graphql/queries';

export default {
  components: { SingleSelect },
  name: 'FundingInstitution',
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
    funding_institutions: {
      query: FETCH_FUNDING_INSTITUTIONS
    }
  },
  data() {
    return {
      funding_institutions: []
    };
  }
};
</script>
