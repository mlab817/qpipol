<template>
	<div>
		<q-item-label class="text-weight-bold text-caption">
			Technical Readiness <mini-refresh @click="refetch" />
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
			<q-option-group
				type="checkbox"
				v-model="model"
				:options="technical_readinesses"
			></q-option-group>
		</template>
	</div>
</template>

<script>
import { FETCH_TECHNICAL_READINESSES } from 'src/graphql';
import MiniRefresh from '../../../ui/buttons/MiniRefresh'

export default {
  name: 'TechnicalReadinesses',
	components: {MiniRefresh},
	props: ['value'],
  apollo: {
    technical_readinesses: {
      query: FETCH_TECHNICAL_READINESSES,
      result({ data }) {
        this.technical_readinesses =
          data.technical_readinesses &&
          data.technical_readinesses.map(x => {
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
      technical_readinesses: []
    };
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  },
	methods: {
  	refetch() {
  		this.$apollo.queries.technical_readinesses.refetch()
		}
	}
};
</script>
