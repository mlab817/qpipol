<template>
  <q-input
    readonly
    type="textarea"
		autogrow
    v-model="value"
    placeholder="No data"
  >
    <template v-slot:append>
      <q-btn
        flat
        round
        icon="content_copy"
        v-copy="value"
        color="blue"
        size="xs"
      >
        <q-tooltip>Copy to clipboard</q-tooltip>
      </q-btn>
    </template>
  </q-input>
</template>

<script>
export default {
  name: 'TextareaCopy',
  props: {
    value: [String, Number],
    type: {
      type: String,
      default: 'textarea'
    }
  }
};
</script>

<style>
.q-textarea .q-field__native {
  resize: none !important;
}
</style>
