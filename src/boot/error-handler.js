
export default async ({ Vue }) => {
  Vue.config.errorHandler = (err, vm, info) => {
    // err: error trace
    // vm: component in which error occured
    // info: Vue specific error information such as lifecycle hooks, events etc.

    // TODO: Perform any custom logic or log to server
    
  };
}
