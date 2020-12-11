<template>
	<div>
		<q-item-label class="text-weight-bold text-caption">
			Regions (Select all that applies) <mini-refresh @click="refetch" />
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
			<q-card flat class="bg-transparent">
				<q-card-section class="q-pa-none">
					<list-option-group
						v-model="model"
						:options="filteredRegions"
						:recode="true"
						:rules="rules"
					/>
				</q-card-section>
			</q-card>
		</template>
	</div>
</template>

<script>
import ListOptionGroup from '@/ui/form-inputs/ListOptionGroup';
import { FETCH_REGIONS } from '@/graphql/queries';
import MiniRefresh from '../../../ui/buttons/MiniRefresh'

export default {
  components: {MiniRefresh, ListOptionGroup },
  name: 'Regions',
  props: ['value', 'rules'],
  computed: {
    model: {
      get() {
        return this.$props.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    },
    filteredRegions() {
      return this.regions.length ? this.regions.filter(x => x.id !== '99') : [];
    }
  },
  apollo: {
    regions: {
      query: FETCH_REGIONS
    }
  },
	methods: {
  	refetch() {
  		this.$apollo.queries.regions.refetch()
		}
	}
};
</script>
