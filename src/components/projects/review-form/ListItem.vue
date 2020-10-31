<template>
  <q-list>
    <q-item tag="label" v-for="opt in options" :key="opt.id">
      <q-item-section avatar>
        <q-checkbox v-model="model" :val="opt.id"></q-checkbox>
      </q-item-section>
      <q-item-section avatar>
        <q-avatar>
          <q-img :src="`statics/${folder}/${opt.id}.${ext}`"></q-img>
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label>
          {{ opt.name }}
        </q-item-label>
        <q-item-label caption v-if="opt.description" :lines="2">
          {{ opt.description }}
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
export default {
  name: 'ListItem',

  props: ['value', 'options', 'folder', 'ext'],

  computed: {
    model: {
      get() {
        return this.$props.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  }
};
</script>
