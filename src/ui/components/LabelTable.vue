<template>
	<div>
		<div class="row">
			<q-item-label header>{{label}}</q-item-label>
		</div>
		<div class="row text-black">
			<slot />
		</div>
	</div>
</template>

<script>
	export default {
		name: 'LabelTable',
		props: ['label']
	}
</script>
