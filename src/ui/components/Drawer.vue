<template>
  <q-scroll-area style="height: calc(100% - 200px); border-right: 1px solid #ddd">
    <app-menu />
  </q-scroll-area>
</template>


<script>
import AppMenu from './Menu'

export default {
  components: {AppMenu},
  name: 'AppDrawer',
  props: ['miniState','user'],
  methods: {
    toggleMini(e) {
      console.log(e)
      this.$emit('update:miniState', !this.miniState)
    }
  }
}
</script>
