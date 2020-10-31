<template>
  <q-option-group
    label="Other PDP Chapters"
    type="checkbox"
    :options="filteredChapters"
    v-model="selected"
  ></q-option-group>
</template>

<script>
import { PDP_CHAPTERS_QUERY } from 'src/graphql';

export default {
  name: 'PdpChapters',
  props: {
    value: Array,
    filter: String
  },
  apollo: {
    pdp_chapters: {
      query: PDP_CHAPTERS_QUERY,
      result({ data }) {
        this.pdp_chapters = data.pdp_chapters
          .filter(o => parseInt(o.id) !== 1 && parseInt(o.id) !== 99)
          .map(x => {
            return {
              value: x.id,
              label: x.name
            };
          });
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
    },
    filteredChapters() {
      const pdp_chapters = this.pdp_chapters;

      if (!this.filter) {
        return pdp_chapters;
      }

      return pdp_chapters.filter(x => x.value !== this.filter);
    }
  },
  data() {
    return {
      pdp_chapters: []
    };
  }
};
</script>
