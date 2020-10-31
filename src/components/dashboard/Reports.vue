<template>
  <zingchart :data="chartData" />
</template>

<script>
import gql from 'graphql-tag';

export default {
  name: 'Report',

  apollo: {
    operating_units: {
      query: gql`
        query {
          operating_units {
            id
            acronym
            investment_target_total
            investment_target_2016
            investment_target_2017
            investment_target_2018
            investment_target_2019
            investment_target_2020
            investment_target_2021
            investment_target_2022
            investment_target_2023
          }
        }
      `
    }
  },

  computed: {
    chartData() {
      return {
        type: 'bar',
        series: [
          {
            values: this.values
          }
        ]
      };
    },
    values() {
      const operating_units = this.operating_units;

      const values = operating_units.map(ou => {
        const {
          acronym,
          investment_target_2016,
          investment_target_2017,
          investment_target_2018,
          investment_target_2019,
          investment_target_2020,
          investment_target_2021,
          investment_target_2022,
          investment_target_2023
        } = ou;

        const target =
          investment_target_2016 +
          investment_target_2017 +
          investment_target_2018 +
          investment_target_2019 +
          investment_target_2020 +
          investment_target_2021 +
          investment_target_2022 +
          investment_target_2023;

        return [acronym, target];
      });

      return values;
    }
  },

  data() {
    return {
      operating_units: []
    };
  }
};
</script>
