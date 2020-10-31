<template>
  <q-option-group
    type="checkbox"
    v-model="model"
    :options="technical_readinesses"
  ></q-option-group>
</template>

<script>
import { FETCH_TECHNICAL_READINESSES } from 'src/graphql';

export default {
  name: 'TechnicalReadinesses',
  props: ['value'],
  apollo: {
    technical_readinesses: {
      query: FETCH_TECHNICAL_READINESSES,
      result({ data }) {
        this.technical_readinesses =
          data.technical_readinesses &&
          data.technical_readinesses.map(x => {
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
      technical_readinesses: []
    };
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  }
};
</script>
