<template>
	<q-toolbar class="bg-white text-black">
		<q-toolbar-title class="text-weight-bold">
			{{ sectionTitle }}
		</q-toolbar-title>
		<q-space />
		<slot></slot>
	</q-toolbar>
</template>

<script>
	export default {
		name: 'SectionHeader',
		props: ['sectionTitle']
	};
</script>
