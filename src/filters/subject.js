export const subject = val => {
  console.log('calling subject filter');
  if (val.includes('created')) {
    return 'Created';
  }
  return null;
};
