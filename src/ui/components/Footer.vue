<template>
  <div>
    <div class="row q-pa-sm q-gutter-xs items-center">
      <q-btn
        flat
        type="a"
        href="https://ipms-docs.web.app"
        dark
        class="text-uppercase"
        target="_blank"
        icon="open_in_new"
      >
        User Manual
      </q-btn>
      <q-space />
      <span @click="help" class="cursor-pointer"> v. {{ version }} </span>
    </div>
  </div>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'AppFooter',
  data() {
    return {
      showAbout: false,
      version: process.env.APP_VERSION
    };
  },
  methods: {
    help() {
      this.$q.dialog({
        title: `App version ${this.version}`,
        message: `Your app version is currently v${this.version}. Compare it to the Releases to check if you are running the latest version of the app.
          Versions do not match? Press <strong>CTRL+F5</strong> on your keyboard to update.`,
        html: true,
        cancel: true
      })
    },
    openDocs() {
      console.log('open url')
      openURL('', null, {
        target: '_blank'
      })
    }
  }
};
</script>
