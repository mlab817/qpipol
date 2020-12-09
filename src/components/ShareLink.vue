<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section class="row justify-between text-h6">
        Copy Link
        <q-space/>
        <q-btn flat round dense icon="close" v-close-popup />
      </q-card-section>
      <q-card-section>
        <q-input readonly v-model="url" outlined>
          <template v-slot:append>
            <q-btn label="Copy" @click="copyText" flat color="secondary" />
          </template>
        </q-input>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn flat round color="primary" icon="fas fa-envelope" @click="onOKClick">
          <q-tooltip>
            Send via email
          </q-tooltip>
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { copyToClipboard } from 'quasar'

export default {
  name: 'ShareLink',
  props: {
    url: String
  },

  methods: {
    // following method is REQUIRED
    // (don't change its name --> "show")
    show () {
      this.$refs.dialog.show()
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide () {
      this.$refs.dialog.hide()
    },

    onDialogHide () {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide')
    },

    onOKClick () {
      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      this.$emit('ok')
      // or with payload: this.$emit('ok', { ... })

      // then hiding dialog
      this.hide()
    },

    onCancelClick () {
      // we just need to hide dialog
      this.hide()
    },

    copyText() {
      copyToClipboard(this.url)
      .then(() => this.$q.notify({
        type: 'positive',
        message: 'Successfully copied to clipboard'
      }))
      .catch(err => this.$q.notify({
        type: 'negative',
        message: err.message
      }))
    }
  }
}
</script>
