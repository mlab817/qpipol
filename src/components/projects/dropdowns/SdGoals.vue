<template>
  <q-option-group
    type="checkbox"
    v-model="selected"
    :options="sustainable_development_goals"
    color="secondary"
  />
</template>

<script>
import { SDG_QUERY } from '@/graphql';

export default {
  name: 'TenPointAgenda',
  props: ['value'],
  apollo: {
    sustainable_development_goals: {
      query: SDG_QUERY,
      result({ data }) {
        this.sustainable_development_goals = data.sustainable_development_goals.map(
          x => {
            return {
              value: x.id,
              label: x.name
            };
          }
        );
      }
    }
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
  data() {
    return {
      sustainable_development_goals: []
    };
  }
};
</script>
