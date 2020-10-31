import { ApolloClient } from 'apollo-client';
import { createUploadLink } from 'apollo-upload-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import VueApollo from 'vue-apollo';
import { ApolloLink } from 'apollo-link';
import localforage from 'localforage';
import { CachePersistor, persistCache } from 'apollo-cache-persist';
import { LocalStorage, Notify, Dialog } from 'quasar';

import store from '@/store';

// Create cache
const cache = new InMemoryCache({
  addTypename: true
});

// set the driver for the cache storage
localforage.setDriver([localforage.INDEXEDDB]);

// define the persistor
export const persistor = new CachePersistor({
  cache,
  storage: localforage
});

// this function determines the size of the localforage database
persistor.getSize().then(size => console.log(`cache size: ${size}`));

const token = LocalStorage.getItem('token');

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }));
  return forward(operation);
});

// create link for error handling
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
            store.dispatch('auth/signoutUser');
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

const uploadLink = createUploadLink({
  uri: process.env.API_ENDPOINT
});

export const client = new ApolloClient({
  // link: ApolloLink.from([authMiddleware, errorLink, pusherLink, uploadLink]),
  link: ApolloLink.from([authMiddleware, errorLink, uploadLink]),
  cache,
  fetchPolicy: 'cache-first',
  connectToDevTools: process.env.DEV,
  resolvers: {}
});

const apolloProvider = new VueApollo({
  defaultClient: client
});

export default async ({ app, Vue }) => {
  Vue.use(VueApollo);
  // if this starts acting up, just delete this
  await persistCache({
    cache,
    storage: localforage
  }).then(() => {
    app.apolloProvider = apolloProvider;
  });
  // app.apolloProvider = apolloProvider;
};
