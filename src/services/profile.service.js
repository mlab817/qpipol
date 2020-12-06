import { client } from 'boot/apollo';
import { handleResponse, handleError } from 'src/utils';

import { GET_CURRENT_USER } from 'src/graphql';
import {
  UPLOAD_USER_AVATAR_MUTATION,
  UPDATE_PROFILE_MUTATION,
  CHOOSE_AVATAR_MUTATION
} from 'src/graphql';

export const profileService = {
  getCurrentUser() {
    return client
      .query({
        query: GET_CURRENT_USER
      })
      .then(handleResponse)
      .catch(handleError);
  },

  uploadUserAvatar({ image }) {
    return client
      .mutate({
        mutation: UPLOAD_USER_AVATAR_MUTATION,
        variables: {
          image: image
        },
        update: (cache, { data: { uploadUserAvatar } }) => {
          const data = cache.readQuery({
            query: GET_CURRENT_USER
          });

          data.getCurrentUser.avatar = uploadUserAvatar.avatar;

          cache.writeQuery({
            query: GET_CURRENT_USER,
            data
          });
        },
        refetchQueries: [
          {
            query: GET_CURRENT_USER
          }
        ]
      })
      .then(handleResponse)
      .catch(handleError);
  },

  updateProfile({ name, position, contact_number }) {
    return client
      .mutate({
        mutation: UPDATE_PROFILE_MUTATION,
        variables: {
          name: name,
          position: position,
          contact_number: contact_number
        },
        update: (store, { data: { updateUser } }) => {
          const data = store.readQuery({
            query: GET_CURRENT_USER
          });

          data.getCurrentUser.name = updateUser.name;
          data.getCurrentUser.position = updateUser.position;
          data.getCurrentUser.contact_number = updateUser.contact_number;

          store.writeQuery({
            query: GET_CURRENT_USER,
            data
          });
        }
      })
      .then(handleResponse)
      .catch(handleError);
  },

  chooseAvatar({ image_id }) {
    return client
      .mutate({
        mutation: CHOOSE_AVATAR_MUTATION,
        variables: {
          image_id: image_id
        },
        refetchQueries: [
          {
            query: GET_CURRENT_USER
          }
        ]
      })
      .then(handleResponse)
      .catch(handleError);
  }
};
