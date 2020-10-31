<template>
  <single-select
    v-model="model"
    label="Typology"
    :options="typologies"
    :rules="rules"
  />
</template>

<script>
import SingleSelect from '@/ui/form-inputs/SingleSelect';
import { FETCH_TYPOLOGIES } from '@/graphql/queries';

export default {
  components: { SingleSelect },
  name: 'Typology',
  props: ['value', 'rules'],
  computed: {
    model: {
      get() {
        return this.$props.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  },
  apollo: {
    typologies: {
      query: FETCH_TYPOLOGIES
    }
  },
  data() {
    return {
      typologies: []
    };
  }
};
</script>
