import { date } from 'quasar';

export const timeDiff = val => {
  console.log('calling filter timeDiff');
  const today = new Date();
  if (val) {
    const diff = date.getDateDiff(today, val, 'days');
    return diff + ' days ago';
  }
  return '';
};
