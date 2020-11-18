<template>
	<div>
		<q-item-label class="text-weight-bold text-caption">
			Ten Point Agenda <mini-refresh @click="refetch" />
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
				:options="ten_point_agenda"
				color="primary"
			/>
		</template>
	</div>
</template>

<script>
import { TEN_POINT_AGENDA_QUERY } from '@/graphql';
import MiniRefresh from '../../../ui/buttons/MiniRefresh'

export default {
  name: 'TenPointAgenda',
	components: {MiniRefresh},
	props: ['value'],
  apollo: {
    ten_point_agenda: {
      query: TEN_POINT_AGENDA_QUERY,
      result({ data }) {
        this.ten_point_agenda = data.ten_point_agenda.map(x => {
          return {
            value: x.id,
            label: x.name
          };
        });
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
      ten_point_agenda: []
    };
  },
	methods: {
  	refetch() {
  		this.$apollo.queries.ten_point_agenda.refetch()
		}
	}
};
</script>
