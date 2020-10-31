import { profileService } from '@/services';

const state = () => {
  return {};
};

const actions = {
  profile: ({}) => {
    return profileService.getCurrentUser();
  },
  updateProfile: ({}, payload) => {
    return profileService.updateProfile(payload);
  },
  uploadUserAvatar: ({}, payload) => {
    return profileService.uploadUserAvatar(payload);
  },
  chooseAvatar: ({}, payload) => {
    return profileService.chooseAvatar(payload);
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
