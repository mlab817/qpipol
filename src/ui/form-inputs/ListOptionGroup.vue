<template>
  <div class="col">
    <span class="text-caption text-weight-bold">{{ label }}</span>
    <div class="row q-pa-md">
      <q-input class="col" v-model="search" square debounce="200" filled placeholder="Filter" clearable />
    </div>
    <div class="row q-pa-none">
      <q-item
        tag="label"
        v-for="(option, index) in filteredItems"
        :key="index"
        v-ripple
        clickable
        dense
        class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12"
      >
        <q-item-section avatar>
          <q-checkbox color="secondary" v-model="model" :val="option.id || option.value" />
        </q-item-section>
        <q-item-section>
          <q-item-label>
            {{ option.name || option.label }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListOptionGroup',
  props: ['options', 'value', 'label'],
  computed: {
    model: {
      get() {
        return this.$props.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    },
    filteredItems() {
      const search = this.search,
        options = this.options
      const needle = search && search.toLowerCase()
      console.log(needle)

      if (needle) {
        return options.filter(o => {
          const valueToMatch = o.label && o.label.toLowerCase() || o.name && o.name.toLowerCase() || ''
          return valueToMatch.indexOf(needle) > -1
        })
      }

      return options
    }
  },
  data() {
    return {
      search: ''
    }
  }
};
</script>
