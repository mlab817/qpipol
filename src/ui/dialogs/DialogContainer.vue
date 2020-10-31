<template>
  <q-dialog
    v-model="show"
    full-height
    :position="$q.screen.xs ? void 0 : 'right'"
    persistent
    :maximized="$q.screen.xs"
    transition-show="jump-left"
    transition-hide="jump-right"
  >
    <q-card :style="$q.screen.xs ? void 0 : 'width:400px'">
      <div v-if="title">
        <dialog-header :title="title" @close="show = false"></dialog-header>
      </div>

      <slot></slot>

      <div v-if="$slots.actions">
        <slot name="actions"></slot>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import DialogHeader from './DialogHeader';
export default {
  components: { DialogHeader },
  name: 'DialogContainer',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  computed: {
    show: {
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
