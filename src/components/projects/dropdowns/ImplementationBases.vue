<template>
  <div>
    <q-item-label class="text-weight-bold text-caption">
      Implementation Basis
    </q-item-label>
    <template v-if="$apollo.loading">
      Loading options...
    </template>
    <template v-else>
      <q-option-group v-model="model" :options="bases" type="checkbox" />
    </template>
  </div>
</template>

<script>
import { BASES_QUERY } from '@/graphql/queries';

export default {
  name: 'ImplementationBases',
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
    bases: {
      query: BASES_QUERY,
      result({ data }) {
        this.bases = data.bases.map(x => {
          return {
            value: x.id,
            label: x.name
          };
        });
      }
    }
  },
  data() {
    return {
      bases: []
    };
  }
};
</script>
