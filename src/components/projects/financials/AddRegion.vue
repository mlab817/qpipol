<template>
  <q-card :style="$q.screen.gt.xs ? 'min-width:400px' : ''">
    <card-header title="Update Region Financial Data"></card-header>

    <q-form @submit.prevent="handleSubmit" ref="myForm">
      <q-card-section class="q-pa-sm q-gutter-y-sm">
        <region
          label="Region"
          v-model="regionToAdd.id"
          :rules="[val => !!val || '* Field is required']"
          readonly
        ></region>

        <annual-target
          class="q-mt-md"
          v-model="regionToAdd.pivot"
        ></annual-target>

        <q-input
          label="Total"
          outlined
          class="col q-mt-md"
          input-class="text-right"
          readonly
          :value="target_total"
        ></q-input>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          outline
          type="button"
          label="Cancel"
          color="negative"
          v-close-popup
        ></q-btn>
        <q-btn type="submit" label="Submit" color="primary"></q-btn>
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import Region from '../dropdowns/Region.vue';
import AnnualTarget from './AnnualTarget';
import CardHeader from '@/ui/cards/CardHeader';

export default {
  components: {
    Region,
    AnnualTarget,
    CardHeader
  },

  name: 'AddRegion',

  props: ['region'],

  computed: {
    target_total() {
      const {
        target_2016,
        target_2017,
        target_2018,
        target_2019,
        target_2020,
        target_2021,
        target_2022,
        target_2023
      } = this.regionToAdd.pivot;

      return (
        target_2016 +
        target_2017 +
        target_2018 +
        target_2019 +
        target_2020 +
        target_2021 +
        target_2022 +
        target_2023
      );
    }
  },

  data() {
    return {
      regionToAdd: {
        id: '',
        pivot: {
          target_2016: 0,
          target_2017: 0,
          target_2018: 0,
          target_2019: 0,
          target_2020: 0,
          target_2021: 0,
          target_2022: 0,
          target_2023: 0
        }
      }
    };
  },

  methods: {
    handleSubmit() {
      this.$refs.myForm.validate().then(success => {
        if (success) {
          this.$emit('input', this.regionToAdd);
        } else {
          alert('Please check form.');
        }
      });
    }
  },

  mounted() {
    if (typeof this.region !== 'undefined') {
      // this.regionToAdd = Object.assign({}, this.region)
      this.regionToAdd = JSON.parse(JSON.stringify(this.region));
    }
  }
};
</script>
