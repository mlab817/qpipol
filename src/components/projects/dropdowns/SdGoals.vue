<template>
	<div>
		<q-item-label class="text-weight-bold text-caption">
			Sustainable Development Goals <mini-refresh @click="refetch" />
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
				v-model="selected"
				:options="sustainable_development_goals"
				color="secondary"
			/>
		</template>
	</div>
</template>

<script>
import { SDG_QUERY } from '@/graphql';
import MiniRefresh from '../../../ui/buttons/MiniRefresh'

export default {
  name: 'TenPointAgenda',
	components: {MiniRefresh},
	props: ['value'],
  apollo: {
    sustainable_development_goals: {
      query: SDG_QUERY,
      result({ data }) {
        this.sustainable_development_goals = data.sustainable_development_goals.map(
          x => {
            return {
              value: x.id,
              label: x.name
            };
          }
        );
      }
    }
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
  data() {
    return {
      sustainable_development_goals: []
    };
  },
	methods: {
  	refetch() {
  		this.$apollo.queries.sustainable_development_goals.refetch()
		}
	}
};
</script>
