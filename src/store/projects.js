import { projectService } from '@/services';
import { preparePayload } from '@/helpers';

const state = () => {
  return {
    projects: [],
    projectsDownloaded: false,
    search: null,
    sort: 'title',
    direction: 'asc', // asc or desc
    filter: '',
    loading: false,
    pageInfo: {},
    error: false,
    selectedProjects: []
  };
};

const actions = {
  setSearch({ commit }, value) {
    commit('SET_SEARCH', value)
  },
  fetchProjects({}) {
    return projectService.index();
  },
  viewProject({}, payload) {
    return projectService.view(payload);
  },
  createProject({}, payload) {
    return projectService.create(payload);
  },
  updateProject({}, project) {
    const payload = preparePayload(project);

    return projectService.update(payload);
  },
  deleteProject({}, payload) {
    return projectService.delete(payload);
  },
  endorseProjects({}, payload) {
    return projectService.endorse(payload);
  },
  finalizeProject({}, project) {
    const payload = preparePayload(project);
    // add finalized to payload
    payload.finalized = true;

    return projectService.finalize(payload);
  },
  selectProject({ commit }, payload) {
    commit('SELECT_PROJECT', payload);
  },
  removeProject({ commit }, payload) {
    commit('REMOVE_PROJECT', payload);
  },
  returnProject({}, payload) {
    return projectService.return(payload);
  },
  validateProject({}, payload) {
    return projectService.validate(payload);
  },
  acceptProject({}, payload) {
    return projectService.acceptProject(payload);
  },
  approveProject({}, payload) {
    return projectService.approveProject(payload);
  },
  saveReviewAsDraft({}, payload) {
    return projectService.saveReviewAsDraft(payload);
  },
  submitReview({}, payload) {
    return projectService.submitReview(payload);
  },
  deleteAttachment({}, payload) {
    return projectService.deleteAttachment(payload);
  },
  uploadAttachment({}, payload) {
    return projectService.uploadAttachment(payload);
  },
  search({}, payload) {
    return projectService.search(payload);
  },
  transfer({}, payload) {
    return projectService.transfer(payload);
  },
  download({}, payload) {
    return projectService.download(payload);
  },
  uploadSignedCopy({}, payload) {
    return projectService.uploadSignedCopy(payload);
  },
  restoreProject({}, id) {
    // payload is id
    return projectService.restore(id);
  },
  forceDelete({}, id) {
    return projectService.forceDelete({
      id: id
    });
  }
};

const mutations = {
  SET_SEARCH(state, value) {
    state.search = value
  }
};

const getters = {};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
