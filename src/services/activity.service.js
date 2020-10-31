import { client } from '@/boot/apollo';
import { handleResponse, handleError } from '@/utils';
import { FETCH_ACTIVITIES } from '../graphql';

export const activityService = {
  get() {
    return client
      .query({
        query: FETCH_ACTIVITIES
      })
      .then(handleResponse)
      .catch(handleError);
  }
};
