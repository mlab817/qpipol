import Papa from 'papaparse'

const state = () => {
	return {
		data: [],
		meta: {},
		errors: []
	}
}

const actions = {
	parse({ commit }, csvFile) {
		console.log(csvFile)
		Papa.parse(csvFile, {
			header: true,
			dynamicTyping: true,
			skipEmptyLines: true,
			complete: ({ data, errors, meta}) => {
				commit('SET_DATA', data)
				commit('SET_ERRORS', errors)
				commit('SET_META', meta)
			}
		})
	},
	deleteSelected({ commit, state }, selected) {
		console.log(selected)
		const data2 = state.data.filter(d => !selected.includes(d))

		commit('SET_DATA', data2)
	},
}

const mutations = {
	SET_DATA(state, value) {
		state.data = value
	},
	SET_META(state, value) {
		state.meta = value
	},
	SET_ERRORS(state, value) {
		state.errors = value
	},
	CLEAR_DATA(state, value) {
		stata.data = []
		state.meta = {}
		state.errors = []
	}
}

const getters = {

}

export default {
	namespaced: true,
	state,
	actions,
	mutations,
	getters
}