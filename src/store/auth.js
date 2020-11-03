import { LocalStorage } from 'quasar';
import { client, persistor } from 'boot/apollo';

import { authService, profileService } from '@/services';
import { showError } from '@/utils';

const state = () => {
  return {
    user: LocalStorage.getItem('user') || null,
    loading: false,
    error: null,
    loggedIn: LocalStorage.getItem('loggedIn') || false,
    token: LocalStorage.getItem('token') || '',
    role: LocalStorage.getItem('role') || ''
  };
};

const actions = {
  signinUser({}, payload) {
    // clear token so it does not get sent to server
    return authService.login(payload);
  },
  getCurrentUser({ commit }) {
    return profileService.getCurrentUser().then(res => {
      LocalStorage.set('user', res.getCurrentUser);
      commit('SET_USER', res.getCurrentUser);
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
  SET_LOADING(state, payload) {
    state.loading = payload;
  },
  SET_ERROR(state, payload) {
    state.error = payload;
  },
  CLEAR_ERROR(state) {
    state.error = null;
  },
  SET_ERROR_MESSAGE(state, payload) {
    state.errorMessage = payload;
  },
  SET_USER(state, payload) {
    state.user = payload;
  },
  CLEAR_USER(state) {
    state.user = null;
  },
  CLEAR_TOKEN(state) {
    state.token = null;
  },
  SET_LOGGED_IN(state, payload) {
    state.loggedIn = payload;
  },
  SET_TOKEN(state, payload) {
    state.token = payload;
  },
  SET_EMAIL(state, payload) {
    state.email = payload;
  },
  SET_ID(state, payload) {
    state.id = payload;
  },
  SET_NAME(state, payload) {
    state.name = payload;
  },
  SET_IMAGE_URL(state, payload) {
    state.image_url = payload;
  },
  SET_OPERATING_UNIT(state, payload) {
    state.operating_unit = payload;
  },
  SET_OPERATING_UNIT_ID(state, payload) {
    state.operating_unit_id = payload;
  },
  SET_VERIFIED(state, payload) {
    state.verified = payload;
  },
  SET_CONTACT_NUMBER(state, payload) {
    state.contact_number = payload;
  },
  SET_POSITION(state, payload) {
    state.position = payload;
  },
  SET_ROLE(state, payload) {
    state.role = payload;
  },
  SET_USER_LOADED(state, payload) {
    state.userLoaded = payload;
  },
  SET_UNREAD_NOTIFICATIONS(state, payload) {
    state.unreadNotifications = payload;
  },
  SET_NOTIFICATIONS(state, payload) {
    state.notifications = payload;
  },
  SET_ME(state, payload) {
    state.me = payload;
  },
  SET_SHOW_VALIDATE_EMAIL_REMINDER(state, payload) {
    state.showValidateEmailReminder = payload;
  }
};

const getters = {
  avatar(state) {
    if (state.user && state.user.avatar) {
      return state.user.avatar;
    } else {
      return 'statics/default.png';
    }
  },
  unreadNotifications(state) {
    let unreadNotifications = [];
    if (state.user && state.user.unreadNotifications) {
      unreadNotifications = state.user.unreadNotifications;
    }
    return unreadNotifications;
  },
  isLoggedIn(state) {
    return !!state.user;
  },
  loading(state) {
    return state.loading;
  },
  error(state) {
    return state.error;
  },
  user(state) {
    return state.user;
  },
  isReviewer(state) {
    if (state.user) {
      return state.user.role ? state.user.role.name === 'reviewer' : false;
    }
    return false;
  },
  isLead(state) {
    if (state.user) {
      return state.user.role ? state.user.role.name === 'lead' : false;
    }
    return false;
  },
  isChief(state) {
    if (state.user) {
      return state.user.role ? state.user.role.name === 'chief' : false;
    }
    return false;
  },
  isSuperadmin(state) {
    if (state.user) {
      return state.user.role ? state.user.role.name === 'superadmin' : false;
    }
    return false;
  },
  isAdmin(state) {
    if (state.user) {
      return state.user.role
        ? state.user.role.name === 'admin' ||
            state.user.role.name === 'superadmin'
        : false;
    }
    return false;
  },
  isEncoder(state) {
    if (state.user) {
      return state.user.role ? state.user.role.name === 'encoder' : false;
    }
    return false;
  },
  isVerified(state) {
    if (state.user) {
      return state.user.verified;
    }
    return false;
  },
  role(state) {
    if (state.user) {
      return state.user.role && state.user.role.name;
    }
    return null;
  },
  operatingUnitId(state) {
    if (state.user) {
      return state.user.operating_unit ? state.user.operating_unit.id : null;
    }
    return null;
  },
  compact(state) {
    if (state.user.setting) {
      return state.user.setting.compact;
    }
    return false;
  },
  dark(state) {
    if (state.user.setting) {
      return state.user.setting.dark;
    }
    return false;
  },
  isAa(state) {
    if (state.user.operating_unit && state.user.operating_unit.operating_unit_type) {
      return state.user.operating_unit.operating_unit_type.name === 'attached-agency'
    }
    return false
  },
  isAc(state) {
    if (state.user.operating_unit && state.user.operating_unit.operating_unit_type) {
      return state.user.operating_unit.operating_unit_type.name === 'attached-corporation'
    }
    return false
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
