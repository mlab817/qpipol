import {Notify} from 'quasar'

export const handleError = err => {
  // console.error(`error: ${err.message}`);
	Notify.create({
		type: 'negative',
		message: err.message
	})
  return Promise.reject(err);
};
