<template>
  <q-page class="q-pt-lg">
    <template v-slot:title>
      <page-title title="Notifications">
        <q-btn
          label="Refresh"
          @click="refreshNotifications"
          dense
          flat
          :loading="loading"
        ></q-btn>
      </page-title>
    </template>

    <div class="row q-pa-sm">
      <q-inner-loading :showing="loading">
        <q-spinner-dots size="50"></q-spinner-dots>
      </q-inner-loading>
      <q-list class="col" separator v-if="!loading">
        <template v-for="notification in user.unreadNotifications">
          <notification-item
            :notification="notification"
            :key="notification.id"
          />
        </template>
        <q-item v-if="!loading && !user.unreadNotifications.length">
          <q-item-section>
            <q-item-label>No notifications.</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';
import PageTitle from '@/ui/page/PageTitle';
import NotificationItem from '../components/notifications/NotificationItem';

export default {
  components: { NotificationItem, PageTitle },
  name: 'PageNotifications',
  computed: {
    ...mapState('auth', ['user'])
  },
  methods: {
    refreshNotifications() {
      // console.log('refresh is called');
    }
  }
};
</script>
