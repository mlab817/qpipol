import { Dark, LocalStorage } from 'quasar';
import { authService } from '@/services';

const state = () => {
  return {
    dense: LocalStorage.getItem('dense') || false,
    dark: LocalStorage.getItem('dark') || false,
    drawer: JSON.parse(localStorage.getItem('drawer')) || false
  };
};

const actions = {
  setDense: ({ commit }, payload) => {
    LocalStorage.set('dense', payload);
    commit('SET_DENSE', payload);
  },
  setDark: ({ commit }, payload) => {
    Dark.set(payload);
    LocalStorage.set('dark', payload);
    commit('SET_DARK', payload);
  },
  updateSetting: ({ commit }, payload) => {
    if (payload.dark) {
      Dark.set(payload.dark);
    }
    if (payload.compact) {
      commit('SET_DENSE', payload.compact);
    }

    return authService.updateSetting(payload);
  }
};

const mutations = {
  SET_DENSE: (state, payload) => (state.dense = payload),
  SET_DARK: (state, payload) => (state.dark = payload),
  SET_DRAWER: (state, payload) => (state.drawer = payload)
};

const getters = {
  showAll(state) {
    return state.showAll;
  },
  avatarColor(state) {
    return state.dark ? 'purple-11' : 'primary';
  },
  buttonColor(state) {
    return state.dark ? 'purple-2' : 'primary';
  },
  dark(state) {
    return state.dark;
  },
  drawer(state) {
    return state.drawer;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
