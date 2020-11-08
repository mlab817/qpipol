<template>
  <div class="column">
    <q-item-label header class="q-pa-none text-weight-bold text-black text-caption">Locally-funded or Foreign-assisted
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
import { RadioInput } from '@/ui'
import { FETCH_TYPES } from 'src/graphql'
import { MiniRefresh } from '@/ui'

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
