<template>
  <q-avatar>
    <img :src="src" />
  </q-avatar>
</template>

<script>
export default {
  name: 'UserAvatar',
  props: ['src']
};
</script>
