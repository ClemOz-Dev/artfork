// eslint-disable-next-line import/no-unresolved
import ExhibitionApiService from "../services/api/ExhibitionApiService.js"

const state = () => ({
  exhibitions: [],
  exhibition: null,
})

const mutations = {
  SET_EXHIBITIONS(state, exhibitions) {
    state.exhibitions = exhibitions
  },
  SET_EXHIBITION(state, exhibition) {
    state.exhibition = exhibition
  },
}

const actions = {
  async fetchExhibitions({ commit }) {
    const exhibitions = await ExhibitionApiService.getExhibitions()
    commit("SET_EXHIBITIONS", exhibitions)
  },

  async fetchExhibitionById({ commit }, exhibitionId) {
    const exhibition =
      await ExhibitionApiService.getExhibitionById(exhibitionId)
    commit("SET_EXHIBITION", exhibition)
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
}
