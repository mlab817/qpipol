<template>
  <q-input
    v-model="model"
    dense
    borderless
    placeholder="Search..."
    clearable
    :debounce="500"
  >
    <template v-slot:append>
      <q-icon name="search" />
    </template>
  </q-input>
</template>

<script>
export default {
  name: 'Search',
  props: ['value'],
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
