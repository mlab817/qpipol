<template>
  <q-item>
    <q-item-section avatar>
      <q-icon
        :color="value ? 'positive' : 'negative'"
        :name="value ? 'check' : 'close'"
      ></q-icon>
    </q-item-section>
    <q-item-section>
      <q-item-label>
        {{ label }}
      </q-item-label>
      <q-item-label caption>
        {{ date }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'TechnicalReadiness',
  props: ['label', 'value', 'date']
};
</script>
