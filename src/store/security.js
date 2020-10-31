import { authService } from '@/services';

const state = () => {
  return {};
};

const actions = {
  resendEmailVerification({}, payload) {
    return authService.resendEmailVerification(payload);
  },
  updatePassword({}, payload) {
    return authService.updatePassword(payload);
  }
};

const mutations = {};

const getters = {};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
