<template>
  <q-list>
    <q-item dense>
      <q-item-section>
        <q-item-label class="text-weight-bold text-uppercase text-blue-grey-6">
          {{ label }}
        </q-item-label>
      </q-item-section>
    </q-item>
    <q-item v-if="!value || !value.length">
      <q-item-section>
        <q-item-label>
          -
        </q-item-label>
      </q-item-section>
    </q-item>
    <q-item v-for="item in value" :key="item.id" dense>
      <q-item-section>
        <q-item-label>
          <q-icon name="check" color="secondary" />
          {{ item.name }}
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import {copyToClipboard} from "quasar";

export default {
  name: 'ListItems',
  props: ['label', 'value']
}
</script>
