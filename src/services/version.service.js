import { FETCH_VERSIONS } from '@/graphql/queries';
import { client } from '@/boot/apollo';
import { handleResponse, handleError } from '@/utils';

export const versionService = {
  get() {
    return client
      .query({
        query: FETCH_VERSIONS
      })
      .then(handleResponse)
      .catch(handleError);
  }
};
