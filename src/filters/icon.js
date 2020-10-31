export const icon = val => {
  if (val.includes('created')) {
    return 'fiber_new';
  } else if (val.includes('updated')) {
    return 'update';
  }
};
