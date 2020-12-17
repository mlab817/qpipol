import {Loading, LocalStorage} from 'quasar';
import { client, persistor } from 'boot/apollo';

import { authService, profileService } from 'src/services';
import { showError } from 'src/utils';

const state = () => {
  return {
    me: LocalStorage.getItem('user') || null,
    loggedIn: LocalStorage.getItem('loggedIn') || false
  };
};

const actions = {
  onAuthStateChanged({ dispatch }) {
    Loading.show('Retrieving user information')
    dispatch('getCurrentUser').then(user => {
      console.log(user)
      if (!user) {
        LocalStorage.remove('user');
        LocalStorage.remove('loggedIn');
        this.$router.replace('/login', {})
      } else {
        this.$router.push('/dashboard')
      }
    })
      .finally(() => Loading.hide())
  },
  signinUser({}, payload) {
    // clear token so it does not get sent to server
    return authService.login(payload);
  },
  getCurrentUser({ commit }) {
    return profileService.getCurrentUser().then(res => {
      LocalStorage.set('user', res.me);
      LocalStorage.set('loggedIn', true);
      commit('SET_USER', res.me);
      return res.me
    });
  },
  clearError({ commit }) {
    commit('CLEAR_ERROR');
  },
  signoutUser({ commit }) {
    // see https://github.com/apollographql/apollo-cache-persist/issues/34#issuecomment-371177206 for info in purging cache

    // clear client store, this will not refetch queries unlike resetStore
    client.clearStore();

    persistor.purge();

    // remove token and user from localStorage
    LocalStorage.remove('token');
    LocalStorage.remove('user');
    LocalStorage.remove('loggedIn')

    // remove user data from store
    commit('CLEAR_USER');

    // clear the token
    commit('CLEAR_TOKEN');

    // redirect to login page
    this.$router.replace({ name: 'login' });
    // this.$router.go();
  },
  forgotPassword({}, email) {
    return authService.forgotPassword({ email: email });
  },
  verifyEmail({}, payload) {
    return authService.verifyEmail(payload);
  },
  checkEmailAvailability({}, payload) {
    return authService
      .checkEmailAvailability({ email: payload })
      .then(res => {
        if (res.checkEmailAvailability.status === 'AVAILABLE') {
          return true;
        } else {
          return false;
        }
      })
      .catch(showError);
  },
  updateForgottenPassword({}, payload) {
    return authService.updateForgottenPassword(payload);
  },
  requestAccount({}, payload) {
    return authService.requestAccount(payload);
  }
};

const mutations = {
  SET_USER(state, payload) {
    state.me = payload;
  },
  CLEAR_USER(state) {
    state.user = null;
  },
  CLEAR_TOKEN(state) {
    state.token = null;
  }
};

const getters = {
  user: (state) => state.me
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
