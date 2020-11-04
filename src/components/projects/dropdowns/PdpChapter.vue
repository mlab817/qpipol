<template>
  <single-select
    label="Main PDP Chapter"
    :options="pdp_chapters"
    v-model="selected"
    :rules="rules"
  ></single-select>
</template>

<script>
import { PDP_CHAPTERS_QUERY } from '@/graphql';
import { SingleSelect } from '@/ui';

export default {
  components: { SingleSelect },
  name: 'PdpChapter',
  props: {
    value: [String, Number],
    rules: Array
  },
  apollo: {
    pdp_chapters: {
      query: PDP_CHAPTERS_QUERY
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
      pdp_chapters: []
    };
  }
};
</script>
