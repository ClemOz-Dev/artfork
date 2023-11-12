const state = {
  current_user: null,
}

const mutations = {
  SET_ME(state, user) {
    state.current_user = user
  },
  RESET_ME(state) {
    state.current_user = null
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
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
