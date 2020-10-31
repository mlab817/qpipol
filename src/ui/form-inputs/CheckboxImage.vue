<template>
  <q-img :src="image" @click="selectThis" class="cursor-pointer">
    <q-icon
      class="absolute"
      size="24px"
      :name="selected ? 'check_box' : 'check_box_outline_blank'"
      :color="selected ? 'blue' : 'white'"
      style="bottom: 2px; right: 2px"
    >
    </q-icon>
  </q-img>
</template>

<script>
export default {
  name: 'CheckboxImage',
  props: ['image', 'value', 'val'],
  computed: {
    selected() {
      return this.$props.value.includes(this.$props.val);
    }
  },
  methods: {
    selectThis() {
      this.$emit('input', this.$props.val);
    }
  }
};
</script>
