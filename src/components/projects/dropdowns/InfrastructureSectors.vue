<template>
	<div>
		<q-item-label class="text-weight-bold text-caption">
			Infrastructure Sector <mini-refresh @click="refetch" />
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
		<q-tree
			:nodes="infrastructure_sectors"
			node-key="id"
			tick-strategy="leaf"
			:ticked.sync="selected"
			default-expand-all
			v-else
		/>
	</div>
</template>

<script>
import { INFRASTRUCTURE_SECTORS } from 'src/graphql';
import MiniRefresh from '../../../ui/buttons/MiniRefresh'

export default {
  name: 'InfrastructureSectors',
	components: {MiniRefresh},
	props: ['value'],
  apollo: {
    infrastructure_sectors: {
      query: INFRASTRUCTURE_SECTORS
    }
  },
  data() {
    return {
      infrastructure_sectors: []
    };
  },
  computed: {
    selected: {
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
  		this.$apollo.queries.infrastructure_sectors.refetch()
		}
	}
};
</script>
