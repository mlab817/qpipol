<template>
  <q-card style="width:360px;" square>
    <div class="row justify-between q-pa-sm">
      <q-item-label header class="q-pa-none">
        About
      </q-item-label>
      <q-icon
        name="close"
        @click="$emit('close')"
        class="cursor-pointer"
      ></q-icon>
    </div>
    <q-card-section>
      <div class="row">
        <q-img src="statics/icons/icon-128x128.png" style="width: 30px;" />
      </div>
      <div class="row q-pt-sm text-weight-bold">
        {{ appName }}
      </div>
      <div class="row text-caption">
        <a
          href="https://semver.org/#spec-item-2"
          style="text-decoration: none; color: black;"
          target="_blank"
          >Version {{ version }}</a
        >
      </div>
      <div class="row q-pt-lg text-caption">
        &copy; 2020 DA-PMS-IPD. All Rights Reserved.
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'AboutComponent',
  data() {
    return {
      version: process.env.APP_VERSION,
			appName: process.env.APP_NAME
    };
  }
};
</script>
