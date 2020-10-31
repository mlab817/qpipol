import { date } from 'quasar';

export const formatDate = val => {
  if (date.isValid(val)) {
    return date.formatDate(val, 'MMM D, YYYY h:mm A');
  }
  return '';
};
