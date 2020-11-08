<template>
  <div class="q-mb-md">
    <q-toolbar class="bg-dark text-white">
      <q-avatar v-if="$route.fullPath !== '/dashboard'">
        <q-btn icon="chevron_left" flat round dark @click="$router.back()" />
      </q-avatar>
      <q-avatar v-if="icon">
        <q-icon :name="icon"></q-icon>
      </q-avatar>
      <!-- will be visible only if screen is greater than sm -->
      <q-toolbar-title class="gt-sm text-uppercase">{{ title }}</q-toolbar-title>

      <q-space />

      <slot></slot>
    </q-toolbar>
    <q-separator />
  </div>
</template>

<script>
export default {
  name: 'PageTitle',
  props: ['title', 'icon']
};
</script>
