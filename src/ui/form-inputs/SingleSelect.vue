<template>
  <div class="col">
    <q-select
      :label="rules && rules.length ? `${label} *` : label"
      v-model="model"
      :options="options"
      option-label="name"
      option-value="id"
      behavior="menu"
      :options-dense="$q.screen.lt.md"
      outlined
      :hint="hint ? hint : void 0"
      :rules="rules"
      :readonly="readonly"
      map-options
      emit-value
      clearable
      :loading="loading"
      dense
    >
    </q-select>
  </div>
</template>

<script>
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
    readonly: Boolean,
    loading: {
      type: Boolean,
      default: false
    },
		withRefresh: Boolean
  },
  computed: {
    model: {
      get() {
        return this.$props.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  },
	methods: {
		refetch() {
			this.$emit('refetch')
		}
	}
};
</script>
