<template>
  <div class="column">
    <q-item-label header class="q-pa-none text-weight-bold text-black text-caption">
      PAP Type
      <mini-refresh @click="refetch" />
    </q-item-label>
    <radio-input
      v-model="model"
      :options="types"
      :recode="true"
      :rules="rules"
    />
  </div>
</template>

<script>
import { RadioInput, MiniRefresh } from 'src/ui'
import { FETCH_TYPES } from 'src/graphql'

export default {
  components: {
    RadioInput,
    MiniRefresh
  },
  name: 'Types',
  props: ['value','rules'],
  apollo: {
    types: {
      query: FETCH_TYPES
    }
  },
  data() {
    return {
      types: []
    }
  },
  computed: {
    model: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    refetch() {
      this.$apollo.queries.types.refetch()
    }
  }
}
</script>
