// import something here
import vcopy from 'vcopy';
import { Notify } from 'quasar';

export default ({ Vue }) => {
  // define v-test directive
  Vue.use(vcopy, {
    name: 'copy',
    success: function() {
      Notify.create({
        message: 'Copied successfully!',
        color: 'primary'
      });
    },
    failure: function() {
      Notify.create({
        message: 'Something went wrong.',
        color: 'negative'
      });
    }
  });
};
