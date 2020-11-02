import { client } from 'boot/apollo';
import { handleResponse, handleError } from 'src/utils';
import {
  PREXC_ACTIVITIES,
  CREATE_PREXC_ACTIVITY,
  DELETE_PREXC_ACTIVITY,
  UPDATE_PREXC_ACTIVITY,
  FINALIZE_PREXC_ACTIVITY,
  FINALIZE_PREXC_ACTIVITIES,
  EXPORT_EXCEL
} from 'src/graphql';

export const programService = {
  createPrexcActivity(payload) {
    return client
      .mutate({
        mutation: CREATE_PREXC_ACTIVITY,
        variables: payload
      })
      .then(handleResponse)
      .catch(handleError);
  },
  deletePrexcActivity(payload) {
    return client
      .mutate({
        mutation: DELETE_PREXC_ACTIVITY,
        variables: payload,
        update: (store, { data: { deletePrexcActivity } }) => {
          const data = store.readQuery({
            query: PREXC_ACTIVITIES
          });

          data.prexc_activities = data.prexc_activities.filter(
            x => x.id !== deletePrexcActivity.id
          );

          store.writeQuery({
            query: PREXC_ACTIVITIES,
            data
          });
        }
      })
      .then(handleResponse)
      .catch(handleError);
  },
  updatePrexcActivity(payload) {
    return client
      .mutate({
        mutation: UPDATE_PREXC_ACTIVITY,
        variables: payload,
        update: (store, { data: { updatePrexcActivity } }) => {
          const data = store.readQuery({
            query: PREXC_ACTIVITIES
          });

          const index = data.prexc_activities.findIndex(
            act => act.id === updatePrexcActivity.id
          );
          data.prexc_activities.splice(index, 1, updatePrexcActivity);

          store.writeQuery({
            query: PREXC_ACTIVITIES,
            data
          });
        }
      })
      .then(handleResponse)
      .catch(handleError);
  },
  finalizePrexcActivity(payload) {
    return client
      .mutate({
        mutation: FINALIZE_PREXC_ACTIVITY,
        variables: payload,
        update: (store, { data: { finalizePrexcActivity } }) => {
          const data = store.readQuery({
            query: PREXC_ACTIVITIES
          });

          const index = data.prexc_activities.findIndex(
            act => act.id === finalizePrexcActivity.id
          );
          data.prexc_activities.splice(index, 1, finalizePrexcActivity);

          store.writeQuery({
            query: PREXC_ACTIVITIES,
            data
          });
        }
      })
      .then(handleResponse)
      .catch(handleError);
  },
  finalizePrexcActivities(payload) {
    return client
      .mutate({
        mutation: FINALIZE_PREXC_ACTIVITIES,
        variables: payload,
        refetchQueries: [
          {
            query: PREXC_ACTIVITIES
          }
        ]
      })
      .then(handleResponse)
      .catch(handleError);
  },
  exportExcel() {
    return client
      .query({
        query: EXPORT_EXCEL
      })
      .then(handleResponse)
      .catch(handleError)
  }
};
