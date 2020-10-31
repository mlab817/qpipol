<template>
  <div>
    <template v-if="filteredIndicators.length">
      <q-input
        filled
        square
        v-model="search"
        label="Filter Indicators"
        stack-label
        class="q-ma-sm"
      ></q-input>
      <q-tree
        :nodes="filteredIndicators"
        nodeKey="value"
        tick-strategy="leaf"
        :ticked.sync="ticked"
        default-expand-all
        :filter="search"
      />
    </template>
    <q-item v-else>
      <q-item-section>
        <q-item-label
          ><q-icon name="warning" color="red" /> Select PDP Chapters
          first.</q-item-label
        >
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
import { PDP_INDICATORS } from '@/constants/pdp';

export default {
  name: 'PdpIndicators',
  props: ['value', 'filter'],
  computed: {
    filteredIndicators() {
      let filteredIndicators = [];

      const pdpIndicators = this.pdp_indicators,
        selectedPdpChapters = this.filter;

      if (!selectedPdpChapters) {
        filteredIndicators = [];
      } else {
        filteredIndicators = pdpIndicators.filter(
          chapter => selectedPdpChapters === chapter.value.toString()
        );
      }

      return filteredIndicators;
    },
    ticked: {
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
      pdp_indicators: PDP_INDICATORS,
      search: null
    };
  }
};
</script>
