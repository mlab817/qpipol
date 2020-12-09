<template>
  <div>
    <q-item-label class="text-weight-bold text-caption">
      Implementation Basis <mini-refresh @click="refetch" />
    </q-item-label>
    <template v-if="$apollo.loading">
      <q-item v-for="i in 3" :key="i">
				<q-item-section avatar>
					<q-skeleton type="QAvatar" />
				</q-item-section>
				<q-item-section>
					<q-skeleton type="rect" width="30%" />
				</q-item-section>
			</q-item>
    </template>
    <template v-else>
      <q-option-group v-model="model" :options="bases" type="checkbox" />
    </template>
  </div>
</template>

<script>
import { BASES_QUERY } from '@/graphql/queries';
import MiniRefresh from '../../../ui/buttons/MiniRefresh'

export default {
  name: 'ImplementationBases',
	components: {MiniRefresh},
	props: {
    value: Array,
    rules: Array
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
  apollo: {
    bases: {
      query: BASES_QUERY,
      result({ data }) {
        this.bases = data.bases.map(x => {
          return {
            value: x.id,
            label: x.name
          };
        });
      }
    }
  },
  data() {
    return {
      bases: []
    };
  },
	methods: {
  	refetch() {
  		this.$apollo.queries.bases.refetch()
		}
	}
};
</script>
