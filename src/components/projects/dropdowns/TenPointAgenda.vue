<template>
  <q-option-group
    type="checkbox"
    v-model="selected"
    :options="ten_point_agenda"
    color="secondary"
  />
</template>

<script>
import { TEN_POINT_AGENDA_QUERY } from '@/graphql';

export default {
  name: 'TenPointAgenda',
  props: ['value'],
  apollo: {
    ten_point_agenda: {
      query: TEN_POINT_AGENDA_QUERY,
      result({ data }) {
        this.ten_point_agenda = data.ten_point_agenda.map(x => {
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
    }
  },
  data() {
    return {
      ten_point_agenda: []
    };
  }
};
</script>
