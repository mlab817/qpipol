import { date } from 'quasar';

export const displayDateDifference = data => {
  if (!data || typeof data === undefined) {
    return null;
  }

  const today = new Date();

  let diff;

  diff = date.getDateDiff(today, data, 'days');

  if (diff == 0) {
    diff = date.getDateDiff(today, data, 'hours') + ' hours ago';
  } else if (diff >= 7) {
    diff = date.getDateDiff(today, data, 'weeks') + ' weeks ago';
  } else {
    diff = diff + ' days ago';
  }

  return diff;
};
