<template>
	<q-td class="text-right">
		{{ value | money }}
	</q-td>
</template>

<script>
	export default {
		name: 'TdMoney',
		props: ['value'],
		filters: {
			money(val) {
				if (val && typeof val === 'number') {
					return val.toLocaleString('en-US', { maximumFractionDigits: 2 })
				} else {
					return val
				}
			}
		}
	}
</script>
