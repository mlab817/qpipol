import { client } from 'boot/apollo';
import { MARK_ALL_AS_READ_MUTATION, MARK_AS_READ_MUTATION } from '../graphql';
import { FETCH_UNREAD_NOTIFICATIONS_QUERY } from '../graphql';
import { handleError, handleResponse } from '../utils';

export const notificationService = {
  get() {
    return client
      .query({
        query: FETCH_UNREAD_NOTIFICATIONS_QUERY
      })
      .then(handleResponse)
      .catch(handleError);
  },
  markAllAsRead() {
    return client
      .mutate({
        mutation: MARK_ALL_AS_READ_MUTATION,
        update: (store, { data: { markAllAsRead } }) => {
          if (markAllAsRead.status == 'SUCCESS') {
            const data = store.readQuery({
              query: FETCH_UNREAD_NOTIFICATIONS_QUERY
            });

            data.unreadNotifications = [];

            store.writeQuery({
              query: FETCH_UNREAD_NOTIFICATIONS_QUERY,
              data
            });
          }
        }
      })
      .then(handleResponse)
      .catch(handleError);
  },
  markAsRead(payload) {
    return client
      .mutate({
        mutation: MARK_AS_READ_MUTATION,
        variables: payload,
        update: (store, { data: { markAsRead } }) => {
          const data = store.readQuery({
            query: FETCH_UNREAD_NOTIFICATIONS_QUERY
          });

          // console.log(data.unreadNotifications);

          data.unreadNotifications = data.unreadNotifications.filter(
            notif => notif.id !== markAsRead.id
          );

          // console.log(data);

          store.writeQuery({
            query: FETCH_UNREAD_NOTIFICATIONS_QUERY,
            data
          });
        },
        optimisticResponse: {
          __typename: 'Mutation',
          markAsRead: {
            id: payload.id,
            status: 'SUCCESS',
            __typename: 'Notification'
          }
        }
      })
      .then(handleResponse)
      .catch(handleError);
  }
};
