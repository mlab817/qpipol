import {Notify} from 'quasar'

export const handleError = err => {
  // console.error(`error: ${err.message}`);
  return Promise.reject(err);
};
