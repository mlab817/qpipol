<template>
	<q-item clickable @click="copyValue">
    <q-item-section>
      <q-item-label class="text-weight-bold text-uppercase text-blue-grey-6">
        {{ label }}
      </q-item-label>
      <q-item-label>
        {{ renderValue }}
      </q-item-label>
    </q-item-section>
	</q-item>
</template>

<script>
  import { copyToClipboard } from 'quasar'

	export default {
		name: 'LabelValue',
		props: {
			label: String,
			value: [String, Number, Object, Boolean, Array]
		},
		computed: {
			renderValue() {
				const value = this.value
				let renderValue

				// if value is not null or undefined
				// return appropriate value
				if (value !== null && value !== undefined) {
					if (typeof value === 'string') {
						renderValue = value
					} else if (typeof value === 'object') {
					  if (value instanceof Array) {
              renderValue = value && value.length && value.map(v => v.name).join('; ')
            } else {
              renderValue =  value && value.name
            }
					} else if (typeof value === 'boolean') {
						renderValue = !value ? 'No' : 'Yes'
					} else if (typeof value === 'number') {
						renderValue = value > 10000 ? value.toLocaleString() : value
					}
				} else {
					renderValue = ''
				}
				// console.info(`${value} : ${typeof value} render ${renderValue}`)
				return renderValue
			}
		},
    methods: {
      copyToClipboard,
      copyValue() {
        this.copyToClipboard(this.renderValue)
          .then(() => {
            this.$q.notify({
              type: 'positive',
              message: 'Successfully copied to clipboard'
            })
          })
      }
    }
	}
</script>
