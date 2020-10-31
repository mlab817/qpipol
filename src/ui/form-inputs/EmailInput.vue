<template>
  <q-input
    square
    outlined
    placeholder="Email"
    :dense="dense"
    type="email"
    v-model="username"
    :rules="rules"
    hide-bottom-space
    :dark="dark"
  >
    <template v-slot:prepend>
      <q-icon name="email"></q-icon>
    </template>
  </q-input>
</template>

<script>
export default {
  name: 'EmailInput',
  props: ['value', 'rules', 'dark', 'dense'],
  computed: {
    username: {
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
