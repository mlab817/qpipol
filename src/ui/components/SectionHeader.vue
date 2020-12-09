<template>
  <div class="column q-pa-md">
    <div class="row text-h5 text-grey-9 text-weight-bold items-center">
      <q-icon :name="icon" color="primary" v-if="icon" />
      {{ title }}
    </div>
    <div class="row text-caption" v-if="description">
      {{description}}
    </div>
  </div>
</template>

<script>
	export default {
		name: 'SectionHeader',
		props: ['title','description','icon']
	};
</script>
