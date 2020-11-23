<template>
  <q-card>
    <q-item :class="`bg-${color}`" class="q-pa-none">
      <q-item-section class=" q-pa-md q-ml-none  text-white">
        <q-item-label class="text-white text-h6 text-weight-bolder">
          {{ value }}
        </q-item-label>
        <q-item-label>
          {{label}}
        </q-item-label>
      </q-item-section>
      <q-item-section side class="q-mr-md text-white">
        <q-icon :name="icon" color="white" size="44px"></q-icon>
      </q-item-section>
    </q-item>
  </q-card>
</template>

<script>
  export default {
    name: 'ScoreCard',
    props: {
      value: [Number, String],
      label: String,
      icon: String,
      color: String
    }
  }
</script>
