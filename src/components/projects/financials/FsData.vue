<template>
  <tr @click="editFsDialog = true" class="cursor-pointer">
    <td class="text-left">
      <q-btn
        flat
        round
        size="sm"
        icon="edit"
        color="secondary"
        @click="editFsDialog = true"
      />
      {{ fsName }}
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
      v-model="editFsDialog"
      full-height
      :position="$q.screen.xs ? void 0 : 'right'"
      persistent
      :maximized="$q.screen.xs"
      transition-show="jump-left"
      transition-hide="jump-right"
    >
      <add-fs :fs="value" @input="updateFsRow"></add-fs>
    </q-dialog>
  </tr>
</template>

<script>
import AddFs from './AddFs';
import { FETCH_FUNDING_SOURCES } from '@/graphql';

export default {
  components: {
    AddFs
  },

  name: 'RowData',

  props: ['value'],

  apollo: {
    funding_sources: {
      query: FETCH_FUNDING_SOURCES
    }
  },

  computed: {
    fsName() {
      const funding_sources = this.funding_sources;
      const id = this.value ? this.value.id : 0;

      if (funding_sources.length) {
        const fs = funding_sources.find(fs => fs.id === id);

        if (fs) {
          return fs.name;
        }
        return '';
      }
      return '';
    }
  },

  data() {
    return {
      editFsDialog: false,
      funding_sources: []
    };
  },

  methods: {
    updateFsRow(evt) {
      this.$emit('input', evt);
      this.editFsDialog = false;
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
