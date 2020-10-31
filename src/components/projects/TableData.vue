<template>
  <td class="text-right bg-grey-3 q-pa-sm">
    {{ value | formatMoney }}
    <q-btn flat round dense icon="content_copy" v-copy="value" color="blue" />
  </td>
</template>

<script>
export default {
  name: 'TableData',

  props: {
    value: {
      type: Number,
      default: 0
    }
  },

  filters: {
    formatMoney(val) {
      if (!val) {
        return 0.0;
      }
      return val.toLocaleString('en-GB', { maximumFractionDigits: 2 });
    }
  }
};
</script>
