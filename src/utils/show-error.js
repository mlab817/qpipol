import { Notify } from 'quasar';

export const showError = error => {
  Notify.create({
    type: 'negative',
    message: error.message,
    position: 'bottom-right'
  });
};
