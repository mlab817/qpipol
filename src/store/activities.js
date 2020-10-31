import { activityService } from '../services/activity.service';

const state = () => {
  return {
    activities: []
  };
};

const actions = {
  fetchActivities: ({}) => {
    return activityService.get();
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
