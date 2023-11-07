import AuthApiService from "../services/api/AuthApiService"
import AuthLocalService from "../services/AuthLocalService"

const state = () => ({
  isConnected: false,
})

const mutations = {
  SET_CONNECTED(state, payload) {
    state.isConnected = payload
  },
}

const actions = {
  async login({ commit }, payload) {
    await AuthApiService.login(payload)
      .then(() => {
        commit("SET_CONNECTED", true)
      })
      .catch((error) => {
        throw error
      })
  },
  async logout({ commit }) {
    await AuthLocalService.deleteJwt()
    commit("SET_CONNECTED", false)
  },
  async register({ commit }, payload) {
    await AuthApiService.register(payload)
      .then(() => {
        commit("SET_CONNECTED", true)
      })
      .catch((error) => {
        throw error
      })
  },

  async checkToken() {
    await AuthLocalService.checkToken()
  },
}

const getters = {
  isConnected: (state) => state.isConnected,
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
}
