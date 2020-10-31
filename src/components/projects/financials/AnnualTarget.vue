<template>
  <div class="q-gutter-y-md">
    <money-input v-model="value.target_2016" label="2016 &amp; Prior" />
    <money-input v-model="value.target_2017" label="2017" />
    <money-input v-model="value.target_2018" label="2018" />
    <money-input v-model="value.target_2019" label="2019" />
    <money-input v-model="value.target_2020" label="2020" />
    <money-input v-model="value.target_2021" label="2021" />
    <money-input v-model="value.target_2022" label="2022" />
    <money-input v-model="value.target_2023" label="2023 &amp; Beyond" />
  </div>
</template>

<script>
import MoneyInput from '@/ui/form-inputs/MoneyInput';

export default {
  components: {
    MoneyInput
  },

  name: 'AnnualTarget',

  props: ['value']
};
</script>
