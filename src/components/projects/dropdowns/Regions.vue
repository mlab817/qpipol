<template>
  <q-expansion-item bordered>
    <template v-slot:header>
      <q-item-section>
        Select Regions
      </q-item-section>

      <q-item-section side>
        <div class="row items-center">
          {{ `${value.length} regions selected` }}
        </div>
      </q-item-section>
    </template>
    <q-card>
      <q-card-section>
        <list-option-group
          v-model="model"
          :options="filteredRegions"
          :recode="true"
          :rules="rules"
        />
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script>
import ListOptionGroup from '@/ui/form-inputs/ListOptionGroup';
import { FETCH_REGIONS } from '@/graphql/queries';

export default {
  components: { ListOptionGroup },
  name: 'Regions',
  props: ['value', 'rules'],
  computed: {
    model: {
      get() {
        return this.$props.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    },
    filteredRegions() {
      return this.regions.filter(x => x.id !== '99');
    }
  },
  apollo: {
    regions: {
      query: FETCH_REGIONS
    }
  }
};
</script>
