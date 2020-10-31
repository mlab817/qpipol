<template>
  <div class="col q-pl-sm">
    <span class="text-caption text-weight-bold">{{ label }}</span>
    <div class="row q-col-gutter-sm q-gutter-y-sm">
      <q-item
        tag="label"
        v-for="(option, index) in options"
        :key="index"
        v-ripple
        clickable
        :dense="dense"
        class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12"
      >
        <q-item-section avatar>
          <q-checkbox color="secondary" v-model="model" :val="option.id" />
        </q-item-section>
        <q-item-section>
          <q-item-label>
            {{ option.name }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ListOptionGroup',
  props: ['options', 'value', 'label'],
  computed: {
    ...mapState('settings', ['dense']),
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
