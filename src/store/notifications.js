import { notificationService } from '../services';

const state = () => {
  return {
    notifications: []
  };
};

const actions = {
  index: ({}) => {
    return notificationService.get();
  },
  markAllAsRead: ({}) => {
    return notificationService.markAllAsRead();
  },
  markAsRead: ({}, payload) => {
    return notificationService.markAsRead(payload);
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
