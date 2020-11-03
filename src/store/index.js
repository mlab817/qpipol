import Vue from 'vue';
import Vuex from 'vuex';

import activities from './activities';
import auth from './auth';
import projects from './projects';
import notifications from './notifications';
import profile from './profile';
import security from './security';
import settings from './settings';
import upload from './upload';

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

const Store = new Vuex.Store({
  modules: {
    activities,
    auth,
    projects,
    notifications,
    profile,
    security,
    settings,
    upload
  },

  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEV
  // plugins: [
  //   createPersistedState({
  //     key: 'da-ipms',
  //     paths: ['options'],
  //     rehydrated: () => console.log('The store has been reloaded.')
  //   })
  // ]
});

export default Store;
