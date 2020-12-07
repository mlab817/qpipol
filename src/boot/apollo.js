import { ApolloClient } from 'apollo-client';
import { createUploadLink } from 'apollo-upload-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import VueApollo from 'vue-apollo';
import localforage from 'localforage';
import { CachePersistor } from 'apollo-cache-persist';
import { LocalStorage } from 'quasar';
import errorLink from "boot/error-link";

import {setContext} from "apollo-link-context";
import {ApolloLink} from "apollo-link";

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

// create link for error handling

const authLink = setContext((_, { headers }) => {
  const token = LocalStorage.getItem('token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const uploadLink = createUploadLink({
  uri: process.env.API_ENDPOINT
});

export const client = new ApolloClient({
  // link: ApolloLink.from([authMiddleware, errorLink, pusherLink, uploadLink]),
  // link: ApolloLink.from([authMiddleware, errorLink, uploadLink]),
  link: ApolloLink.from([authLink, errorLink, uploadLink]),
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
  // await persistCache({
  //   cache,
  //   storage: localforage
  // }).then(() => {
  //   app.apolloProvider = apolloProvider;
  // });
  app.apolloProvider = apolloProvider;
};
