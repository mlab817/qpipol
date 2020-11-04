// test.js
// create a directive v-test to add data attribute for testing

export default (el, binding) => {
  if (process.env.NODE_ENV === 'development') {
    Object.keys(binding.value).forEach(value => {
      el.setAttribute(`data-test-${value}`, binding.value[value]);
    });
  }
};
