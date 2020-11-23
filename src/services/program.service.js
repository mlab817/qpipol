import { client } from 'boot/apollo';
import { handleResponse, handleError } from 'src/utils';
import {
	PREXC_ACTIVITIES,
	CREATE_PREXC_ACTIVITY,
	DELETE_PREXC_ACTIVITY,
	UPDATE_PREXC_ACTIVITY,
	FINALIZE_PREXC_ACTIVITY,
	FINALIZE_PREXC_ACTIVITIES,
	EXPORT_EXCEL,
	UPDATE_OPERATING_UNIT_PREXC_ACTIVITIES,
	EXPORT_FOR_CONSOLIDATION,
	SYNC_ACTIVITY_TO_PROJECT,
	RECLASSIFY_PREXC_ACTIVITY,
	OU_PREXC_ACTIVITIES
} from 'src/graphql'

export const programService = {
  createPrexcActivity(payload) {
    return client
      .mutate({
        mutation: CREATE_PREXC_ACTIVITY,
        variables: payload,
        update: (store, { data: { createPrexcActivity } }) => {
          const data = store.readQuery({
            query: PREXC_ACTIVITIES
          })

          data.prexc_activities.push(createPrexcActivity)

          store.writeQuery({
            query: PREXC_ACTIVITIES,
            data
          })
        }
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
    // create a null payload
    const payload = {
      operating_unit_id: null
    }
    return client
      .mutate({
        mutation: EXPORT_EXCEL,
        variables: payload
      })
      .then(handleResponse)
      .catch(handleError)
  },
  updatePrexcActivities(payload) {
    return client
      .mutate({
        mutation: UPDATE_OPERATING_UNIT_PREXC_ACTIVITIES,
        variables: payload,
        refetchQueries: [
          {
            query: PREXC_ACTIVITIES
          }
        ]
      })
      .then(handleResponse)
      .catch(handleError)
  },
  exportForConsolidation() {
    return client
      .mutate({
        mutation: EXPORT_FOR_CONSOLIDATION,
        variables: null
      })
      .then(handleResponse)
      .catch(handleError)
  },
  syncActivityToProject(payload) {
    return client
      .mutate({
        mutation: SYNC_ACTIVITY_TO_PROJECT,
        variables: payload,
        update: (store, { data: { syncProjectToActivity } }) => {
          const data = store.readQuery({
            query: PREXC_ACTIVITIES
          });

          const index = data.prexc_activities.findIndex(
            act => act.id === syncProjectToActivity.id
          );
          data.prexc_activities.splice(index, 1, syncProjectToActivity);

          store.writeQuery({
            query: PREXC_ACTIVITIES,
            data
          });
        }
      })
      .then(handleResponse)
      .catch(handleError)
  },
	reclassifyPrexcActivity(payload) {
  	return client
		  .mutate({
			  mutation: RECLASSIFY_PREXC_ACTIVITY,
			  variables: payload,
			  update: (store, { data: { reclassifyPrexcActivity } }) => {
			  	console.log(reclassifyPrexcActivity)
			    const data = store.readQuery({
				    query: OU_PREXC_ACTIVITIES,
				    variables: {
				    	id: reclassifyPrexcActivity.operating_unit_id
				    }
			    })
				  
				  const index = data.operating_unit.prexc_activities.findIndex(x => x.id === reclassifyPrexcActivity.id)
				  data.operating_unit.prexc_activities.splice(index, 1, reclassifyPrexcActivity)
				  
				  store.writeQuery({
					  query: OU_PREXC_ACTIVITIES,
					  variables: {
						  id: reclassifyPrexcActivity.operating_unit_id
					  },
					  data
				  })
			  }
		  })
		  .then(handleResponse)
		  .catch(handleError)
	}
};
