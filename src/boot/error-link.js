import { onError } from "apollo-link-error";
import { Dialog, LocalStorage, Notify } from "quasar";
import store from 'src/store';
import { handleError } from "src/utils";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(
      // ({ debugMessage, message, locations, path, extensions }) => {
      ({ debugMessage, message }) => {
        // console.log(extensions);
        // if unauthenticated, notify user and allow them to logout
        if (debugMessage === 'Unauthenticated.') {
          // console.error('Token is not valid.');
          Dialog.create({
            title: 'Invalid',
            message: 'Your session has expired. Please login again.',
            persistent: true
          }).onDismiss(() => {
            LocalStorage.clear();
            store.dispatch('auth/signoutUser').catch(handleError);
          });
        }
        Notify.create({
          message: `${message}`,
          position: 'bottom-right',
          timeout: 5000,
          type: 'negative'
        });
        // console.error(
        //   `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        // );
      }
    );
  if (networkError) {
    // console.log('Network error is detected!');
    // console.error(`[Network error]: ${networkError}`);
    Notify.create({
      message: 'A network error occurred.',
      color: 'negative',
      position: 'top-right'
    });
  }
});

export default errorLink
