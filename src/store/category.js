import CategoryApiService from "../services/api/CategoryApiService"

const state = () => ({
  categories: [],
})

const mutations = {
  SET_CATEGORIES(state, categories) {
    state.categories = categories
  },
}

const actions = {
  async fetchCategories({ commit }) {
    const categories = await CategoryApiService.getCategories()
    commit("SET_CATEGORIES", categories)
  },
}

const getters = {
  categories: (state) => state.categories,
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
}
