<template>
  <tr @click="editRegionFinancialDialog = true" class="cursor-pointer">
    <td class="text-left">
      <q-btn
        flat
        round
        size="sm"
        icon="edit"
        color="secondary"
        @click="editRegionFinancialDialog = true"
      />
      {{ value ? value.label : '' }}
    </td>
    <td class="text-right">
      {{ value.pivot.target_2016 }}
    </td>
    <td class="text-right">
      {{ value.pivot.target_2017 }}
    </td>
    <td class="text-right">
      {{ value.pivot.target_2018 }}
    </td>
    <td class="text-right">
      {{ value.pivot.target_2019 }}
    </td>
    <td class="text-right">
      {{ value.pivot.target_2020 }}
    </td>
    <td class="text-right">
      {{ value.pivot.target_2021 }}
    </td>
    <td class="text-right">
      {{ value.pivot.target_2022 }}
    </td>
    <td class="text-right">
      {{ value.pivot.target_2023 }}
    </td>
    <td class="text-right">
      {{
        (value.pivot.target_2016 +
          value.pivot.target_2017 +
          value.pivot.target_2018 +
          value.pivot.target_2019 +
          value.pivot.target_2020 +
          value.pivot.target_2021 +
          value.pivot.target_2022 +
          value.pivot.target_2023)
          | money
      }}
    </td>
    <!-- Add region dialog -->
    <q-dialog
      v-model="editRegionFinancialDialog"
      full-height
      :position="$q.screen.xs ? void 0 : 'right'"
      persistent
      :maximized="$q.screen.xs"
      transition-show="jump-left"
      transition-hide="jump-right"
    >
      <add-region :region="value" @input="updateRegionRow"></add-region>
    </q-dialog>
  </tr>
</template>

<script>
import AddRegion from './AddRegion';
import { FETCH_REGIONS } from '@/graphql';

export default {
  components: {
    AddRegion
  },

  name: 'RowData',

  props: ['value', 'index'],

  apollo: {
    regions: {
      query: FETCH_REGIONS
    }
  },

  computed: {
    regionName() {
      const regions = this.regions;
      const id = this.value ? this.value.id : 0;

      if (regions.length) {
        const region = regions.find(region => region.id === id);

        if (region) {
          return region.name;
        }
        return '';
      }
      return '';
    }
  },

  data() {
    return {
      editRegionFinancialDialog: false,
      regions: []
    };
  },

  methods: {
    updateRegionRow(evt) {
      // console.log(evt);
      // console.log('updatedData = ', evt);
      this.$emit('input', evt);
      this.editRegionFinancialDialog = false;
    }
  },

  filters: {
    money(val) {
      if (!val) {
        return 0.0;
      }
      return val.toLocaleString();
    }
  }
};
</script>
