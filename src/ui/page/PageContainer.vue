<template>
  <q-page>
<!--    <slot name="title"></slot>-->

    <div class="q-pa-md">
      <slot></slot>
    </div>

    <!-- QPageScroller -->
    <q-page-scroller
      position="bottom-right"
      :scroll-offset="150"
      :offset="[18, 18]"
    >
      <q-btn fab icon="keyboard_arrow_up" color="secondary" unelevated />
    </q-page-scroller>
  </q-page>
</template>

<script>
export default {
  name: 'PageContainer'
};
</script>
