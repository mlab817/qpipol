<template>
  <q-btn flat round icon="notifications" class="q-mr-md text-grey-6">
    <q-badge color="red" floating v-if="unreadNotifications.length">
      {{ unreadNotifications.length }}
    </q-badge>

    <q-menu square :offset="[0, 15]" max-width="400px">
      <q-item dense class="q-pa-none">
        <q-item-section>
          <q-item-label header class="text-weight-bolder"
            >Notifications</q-item-label
          >
        </q-item-section>
        <q-item-section side>
          <q-btn
            flat
            label="Mark all as read"
            dense
            color="primary"
            @click="markAllAsRead"
            :disable="!unreadNotifications.length"
          ></q-btn>
        </q-item-section>
      </q-item>

      <q-separator></q-separator>

      <q-list separator>
        <template v-if="unreadNotifications.length">
          <notification-item
            v-for="notification in unreadNotifications"
            :key="notification.id"
            :notification="notification"
          />
        </template>
        <q-item v-else>
          <q-item-label>
            No unread notifications.
          </q-item-label>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script>
import { mapActions } from 'vuex';
import NotificationItem from '@/components/notifications/NotificationItem';
import { FETCH_UNREAD_NOTIFICATIONS_QUERY } from '@/graphql';

export default {
  components: { NotificationItem },
  name: 'NotificationButton',
  apollo: {
    unreadNotifications: {
      query: FETCH_UNREAD_NOTIFICATIONS_QUERY
    }
  },
  methods: {
    ...mapActions('notifications', ['markAllAsRead'])
  },
  data() {
    return {
      unreadNotifications: [] // placeholder to ensure that the variable is defined while apollo is being called
    };
  }
};
</script>
