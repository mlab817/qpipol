<template>
  <page-container>
    <template v-slot:title>
      <page-title title="Activity Feed" icon="work">
        <q-btn icon="refresh" flat round @click="refetch" />
      </page-title>
    </template>

    <template v-if="$apollo.loading">
      <q-list separator>
        <q-item v-for="i in 10" :key="i">
          <q-item-section avatar>
            <q-skeleton type="QAvatar"></q-skeleton>
          </q-item-section>
          <q-item-section>
            <q-item-label>
              <q-skeleton type="text" width="40%"></q-skeleton>
            </q-item-label>
            <q-item-label>
              <q-skeleton type="text" width="10%"></q-skeleton>
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </template>

    <template v-else>
      <div>
        <q-list separator v-if="activities.length">
          <q-item v-for="(activity, index) in activities" :key="index">
            <q-item-section avatar>
              <q-avatar color="primary" class="text-white">
                {{ activity.causer.name.charAt(0) }}
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label lines="1">
                <span class="text-weight-bolder">
                  {{ activity.causer.name }}:
                </span>
                <span>
                  {{ activity.description }}:
                  {{ activity.subject ? activity.subject.title : null }}
                </span>
              </q-item-label>
              <q-item-label caption>
                {{ timeAgo(activity.created_at) }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

        <no-item
          v-if="!activities.length"
          icon="cancel"
          message="No activities yet."
        ></no-item>
      </div>
    </template>
  </page-container>
</template>

<script>
import PageContainer from '@/ui/page/PageContainer';
import PageTitle from '@/ui/page/PageTitle';
import { FETCH_ACTIVITIES } from '@/graphql/queries';
import NoItem from '@/ui/components/NoItem';
import { displayDateDifference } from '@/utils';
import { timeAgo } from '@/filters';

export default {
  name: 'PageActivity',
  components: { NoItem, PageTitle, PageContainer },
  apollo: {
    activities: {
      query: FETCH_ACTIVITIES,
      variables: {
        first: 10,
        page: 1,
        orderBy: [
          {
            field: 'CREATED_AT',
            order: 'DESC'
          }
        ]
      },
      result({ data }) {
        this.activities = data.activities.data;
      }
    }
  },
  data() {
    return {
      activities: []
    };
  },
  methods: {
    displayDateDifference,
    timeAgo,
    refetch() {
      this.$apollo.queries.activities.refetch();
    }
  },
  filters: {
    subject(val) {
      if (val.includes('created')) {
        return 'Created';
      } else if (val.includes('updated')) {
        return 'Updated';
      } else if (val.includes('deleted')) {
        return 'Deleted';
      }
      return null;
    }
  }
};
</script>
