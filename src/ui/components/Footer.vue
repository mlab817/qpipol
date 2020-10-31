<template>
  <div>
    <div class="row q-pa-sm q-gutter-xs items-center">
      <q-btn flat dense type="a" class="text-lowercase gt-sm">
        da-ipms2020.web.app
      </q-btn>
      <q-btn
        flat
        dense
        type="a"
        class="text-capitalize"
        href="https://ipms-docs.web.app"
        target="_blank"
        icon-right="open_in_new"
        label="Docs"
      />
      <q-space />
      <span> v. {{ version }} </span>
    </div>

    <q-dialog v-model="showAbout">
      <about-component @close="showAbout = false"></about-component>
    </q-dialog>
  </div>
</template>

<script>
import AboutComponent from './About';

export default {
  name: 'AppFooter',
  components: { AboutComponent },
  data() {
    return {
      showAbout: false,
      version: process.env.APP_VERSION
    };
  }
};
</script>
