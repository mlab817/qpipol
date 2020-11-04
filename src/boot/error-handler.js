import Rollbar from 'rollbar';
import { Notify } from 'quasar'

export default async ({ Vue }) => {
  Vue.prototype.$rollbar = new Rollbar({
    accessToken: '87b61aeb039b44a8b3269a70ef0f4d9b',
    captureUncaught: true,
    captureUnhandledRejections: true,
    enabled: true,
    environment: 'production'
  });

  Vue.config.errorHandler = (err, vm, info) => {
    vm.$rollbar.error(err);
    Notify.create({
      type: 'warning',
      message: err.message
    })
    throw err; // rethrow
    
    // err: error trace
    // vm: component in which error occured
    // info: Vue specific error information such as lifecycle hooks, events etc.

    // TODO: Perform any custom logic or log to server
  };
}
