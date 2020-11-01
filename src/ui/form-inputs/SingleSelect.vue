<template>
  <div class="col">
    <span class="text-caption text-weight-bold">{{ label }}</span>
    <q-select
			use-input
      square
      v-model="model"
      :options="internalOptions"
      option-label="name"
      option-value="id"
      behavior="menu"
      :dense="$q.screen.lt.md"
      :options-dense="$q.screen.lt.md"
      outlined
      :hint="hint ? hint : void 0"
      label-color="secondary"
      :rules="rules"
      dropdown-icon="unfold_more"
      :readonly="readonly"
      hide-bottom-space
      map-options
      emit-value
      clearable
			@filter="filterFn"
    >
    </q-select>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'SingleSelect',
  props: {
    label: {
      type: String,
      default: ''
    },
    options: {
      type: Array
    },
    value: [String, Number, Boolean],
    hint: { type: String },
    rules: Array,
    readonly: Boolean
  },
  computed: {
    ...mapState('settings', ['dense']),
    model: {
      get() {
        return this.$props.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  },
	data() {
  	return {
  		internalOptions: []
		}
	},
	methods: {
		filterFn (val, update) {
			const options = this.options
			if (val === '') {
				update(() => {
					this.internalOptions = options
				})
				return
			}

			update(() => {
				const needle = val.toLowerCase()
				this.internalOptions = options.filter(v => v.name.toLowerCase().indexOf(needle) > -1)
			})
		}
	}
};
</script>
