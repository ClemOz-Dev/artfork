const state = {
  current_user: null,
  galleries: [],
}

const mutations = {
  SET_ME(state, user) {
    state.current_user = user
  },
  RESET_ME(state) {
    state.current_user = null
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
  currentUser: (state) => state.current_user,
  myGalleries: (state) => state.galleries,
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
