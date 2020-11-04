<template>
  <q-tree
    :nodes="infrastructure_sectors"
    node-key="id"
    tick-strategy="leaf"
    :ticked.sync="selected"
  />
</template>

<script>
import { INFRASTRUCTURE_SECTORS } from 'src/graphql';

export default {
  name: 'InfrastructureSectors',
  props: ['value'],
  apollo: {
    infrastructure_sectors: {
      query: INFRASTRUCTURE_SECTORS
    }
  },
  data() {
    return {
      infrastructure_sectors: []
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
  }
};
</script>
