import Papa from 'papaparse'

const state = () => {
	return {
		data: [],
		meta: {},
		errors: [],
		headers: [
			'id',
			'program',
			'subprogram',
			'activity',
			'uacs_code',
			'infrastructure_target_2016',
			'infrastructure_target_2017',
			'infrastructure_target_2018',
			'infrastructure_target_2019',
			'infrastructure_target_2020',
			'infrastructure_target_2021',
			'infrastructure_target_2022',
			'infrastructure_target_2023',
			'infrastructure_target_2024',
			'infrastructure_target_2025',
			'infrastructure_target_total',
			'investment_target_2016',
			'investment_target_2017',
			'investment_target_2018',
			'investment_target_2019',
			'investment_target_2020',
			'investment_target_2021',
			'investment_target_2022',
			'investment_target_2023',
			'investment_target_2024',
			'investment_target_2025',
			'investment_target_total',
			'nep_2016',
			'nep_2017',
			'nep_2018',
			'nep_2019',
			'nep_2020',
			'nep_2021',
			'nep_2022',
			'nep_2023',
			'nep_2024',
			'nep_2025',
			'nep_total',
			'gaa_2016',
			'gaa_2017',
			'gaa_2018',
			'gaa_2019',
			'gaa_2020',
			'gaa_2021',
			'gaa_2022',
			'gaa_2023',
			'gaa_2024',
			'gaa_2025',
			'gaa_total',
			'disbursement_2016',
			'disbursement_2017',
			'disbursement_2018',
			'disbursement_2019',
			'disbursement_2020',
			'disbursement_2021',
			'disbursement_2022',
			'disbursement_2023',
			'disbursement_2024',
			'disbursement_2025',
			'disbursement_total'
		]
	}
}

const actions = {
	parse({ commit, dispatch }, csvFile) {
		dispatch('cleanState', null)
		Papa.parse(csvFile, {
			header: false,
			dynamicTyping: true,
			skipEmptyLines: true,
			complete: ({ data, errors, meta}) => {
				dispatch('cleanUpAndFormatData', data)
				commit('SET_ERRORS', errors)
				commit('SET_META', meta)
			}
		})
	},
	cleanUpAndFormatData({ commit, state }, data) {
		const data2 = data.filter(d => (d[0] !== 'Total' && d[0] !== '' && d[0] !== 'ID'))

		const keys = state.headers

		const niceData = data2.map(v => {
			const merged = keys.reduce((obj, key, index) => ({ ...obj, [key]: v[index] }), {});
			return merged
		})

		commit('SET_DATA', niceData)
	},
	deleteSelected({ commit, state }, selected) {
		console.log(selected)
		const data2 = state.data.filter(d => !selected.includes(d))

		commit('SET_DATA', data2)
	},
	cleanState({ commit }) {
		commit('CLEAR_DATA')
	}
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
	CLEAR_DATA(state) {
		state.data = []
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
