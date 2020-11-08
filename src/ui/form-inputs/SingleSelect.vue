<template>
  <div class="col">
    <span class="text-caption text-weight-bold">{{ label }} <mini-refresh v-if="withRefresh" @click="refetch" /></span>
    <q-select
      square
      v-model="model"
      :options="options"
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
      :loading="loading"
    >
    </q-select>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import MiniRefresh from '../buttons/MiniRefresh'

export default {
  name: 'SingleSelect',
	components: {MiniRefresh},
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
	methods: {
		refetch() {
			console.log('refetch called')
			this.$emit('refetch')
		}
	}
};
</script>
