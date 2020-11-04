<template>
  <div>
    <div class="row justify-between items-center">
      <q-item-label header class="q-px-none">Latest Activity</q-item-label>
      <q-space />
      <!-- <q-btn
        flat
        dense
        class="text-capitalize"
        @click="goToActivity"
        label="All Activities"
        icon-right="chevron_right"
      /> -->
    </div>

    <q-card square bordered flat>
      <q-list separator>
        <template v-if="$apollo.loading">
          <q-item v-for="i in 5" :key="i">
            <q-item-section avatar>
              <q-skeleton type="QAvatar" />
            </q-item-section>
            <q-item-section>
              <q-item-label>
                <q-skeleton type="text" width="80%" />
              </q-item-label>
              <q-item-label caption>
                <q-skeleton type="text" width="20%" />
              </q-item-label>
            </q-item-section>
          </q-item>
        </template>
        <template v-else>
          <template v-if="activities.length">
            <q-item v-for="activity in activities" :key="activity.id">
              <q-item-section avatar>
                <q-avatar>
                  <q-icon :name="activity.description | icon" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label :lines="2"
                  >{{ activity.description }}:
                  {{
                    activity.subject ? activity.subject.title : ''
                  }}</q-item-label
                >
                <q-item-label caption>{{
                  timeAgo(activity.created_at)
                }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
          <q-item v-else>
            <q-item-section avatar>
              <q-icon name="warning" />
            </q-item-section>
            <q-item-section>
              <q-item-label>No activities to display.</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-list>
    </q-card>
  </div>
</template>

<script>
import { FETCH_ACTIVITIES } from '@/graphql/queries';
import { icon, subject, timeDiff, timeAgo } from '@/filters';

export default {
  name: 'ActivityComponent',
  data() {
    return {
      activities: []
    };
  },
  apollo: {
    activities: {
      query: FETCH_ACTIVITIES,
      variables: {
        first: 5,
        page: 1
      },
      result({ data }) {
        this.activities = data.activities.data;
      }
    }
  },
  methods: {
    timeAgo,
    goToActivity() {
      this.$router.push('/activity');
    }
  },
  filters: {
    icon,
    subject,
    timeDiff
  },
  beforeDestroy() {
    this.$apollo.queries.activities.stop();
  }
};
</script>
