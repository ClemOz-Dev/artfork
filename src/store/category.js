import CategoryApiService from "../services/api/CategoryApiService.js"

const state = () => ({
  categories: [],
  category: null,
})

const mutations = {
  SET_CATEGORIES(state, categories) {
    state.categories = categories
  },
  SET_CATEGORY(state, category) {
    state.category = category
  },
}

const actions = {
  async fetchCategories({ commit }) {
    const categories = await CategoryApiService.getCategories()
    commit("SET_CATEGORIES", categories)
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
}
