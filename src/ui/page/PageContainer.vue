<template>
  <q-page>
    <slot name="title"></slot>

    <!-- <div class="row">
      <div
        class="offset-xl-2 col-xl-8 offset-lg-3 col-lg-6 offset-md-1 col-md-10 offset-sm-1 col-sm-10 offset-xs-0 col-xs-12"
      >
        <slot></slot>
      </div>
    </div> -->

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
