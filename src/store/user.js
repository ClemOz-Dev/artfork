
const state = {
  me: null,
  galleries: [],
}

const mutations = {
  SET_ME(state, user) {
    state.me = user
  },
  RESET_ME(state) {
    state.me = null
  },
  SET_MY_GALLERIES(state, galleries) {
    console.log(galleries)
    state.galleries = galleries
  },
}

const actions = {
  saveMe({ commit }, user) {
    commit("SET_ME", user)
  },
  resetMe({ commit }) {
    commit("RESET_ME")
  },
}

const getters = {
  getMe: (state) => state.me,
  myGalleries: (state) => state.galleries,
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
