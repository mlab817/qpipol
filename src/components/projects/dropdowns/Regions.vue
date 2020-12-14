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
  components: { MiniRefresh, ListOptionGroup },
  name: 'Regions',
  props: ['value', 'rules', 'spatialCoverageId'],
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
  watch: {
    'spatialCoverageId': {
      handler(spatialCoverageId) {
        // console.log(`from regions: ${spatialCoverageId}`)
        let selectedRegions = [],
          currentRegions = this.value,
          scId = parseInt(spatialCoverageId)
        // console.log(spatialCoverageId === 1)
        if (scId === 1) {
          // nationwide, select all regions
          selectedRegions = this.regions.map(x => x.id)
        } else if (scId === 3) {
          // clear since it's only a single region
          selectedRegions = []
        } else if (scId === 4) {
          // clear since it is abroad
          selectedRegions = []
        } else if (!scId) {
          // clear since none is selected
          selectedRegions = []
        } else {
          selectedRegions = currentRegions
        }
        this.$emit('input', selectedRegions)
      }
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
