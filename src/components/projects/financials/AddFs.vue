<template>
  <q-card :style="$q.screen.gt.xs ? 'min-width:400px' : ''">
    <card-header title="Add Funding Source Financial Data"></card-header>
    <q-form @submit.prevent="handleSubmit" ref="myForm">
      <q-card-section class="q-pa-sm">
        <funding-source
          v-model="fsToAdd.id"
          label="Funding Source"
          :rules="[val => !!val || '* Field is required']"
        ></funding-source>

        <annual-target class="q-mt-md" v-model="fsToAdd.pivot"></annual-target>

        <q-input
          label="Total"
          outlined
          class="col q-mt-md"
          input-class="text-right"
          readonly
          :value="fs_total"
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
        <q-btn label="Submit" color="primary" type="submit"></q-btn>
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import CardHeader from '@/ui/cards/CardHeader';
import AnnualTarget from './AnnualTarget';
import FundingSource from '../dropdowns/FundingSource';

export default {
  components: {
    CardHeader,
    AnnualTarget,
    FundingSource
  },

  name: 'AddFs',

  props: ['fs'],

  computed: {
    fs_total() {
      const {
        target_2016,
        target_2017,
        target_2018,
        target_2019,
        target_2020,
        target_2021,
        target_2022,
        target_2023
      } = this.fsToAdd.pivot;

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
      fsToAdd: {
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
          this.$emit('input', this.fsToAdd);
        } else {
          alert('Please check input');
        }
      });
    }
  },

  mounted() {
    if (typeof this.fs !== 'undefined') {
      this.fsToAdd = JSON.parse(JSON.stringify(this.fs));
    }
  }
};
</script>
