<template>
  <q-td @click="copyValue" align="right" class="cursor-pointer">
    {{ value | formatMoney }}
  </q-td>
</template>

<script>
  import { copyToClipboard } from 'quasar'

  export default {
    name: 'TdClick',
    props: ['value'],
    methods: {
      copyValue() {
        copyToClipboard(this.value)
        .then(() => {
          this.$q.notify({
            type: 'positive',
            message: 'Successfully copied to clipboard'
          })
        })
        .catch(err => {
          this.$q.notify({
            type: 'negative',
            message: err.message
          })
        })
      }
    },
    filters: {
      formatMoney(val) {
        if (val) {
          return val.toLocaleString();
        }
        return 0.00;
      }
    }
  }
</script>
