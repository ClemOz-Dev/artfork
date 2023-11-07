import ArtistApiService from "../services/api/ArtistApiService.js"

const state = () => ({
  artists: [],
  artist: null,
})

const mutations = {
  SET_ARTISTS(state, artists) {
    state.artists = state.artists.concat(artists)
  },
  SET_ARTIST(state, artist) {
    state.artist = artist
  },
  RESET_ARTISTS(state, artists) {
    state.artists = artists
  },
}

const actions = {
  async fetchArtists({ commit }, payload) {
    const artists = await ArtistApiService.getArtists(payload)
    commit("SET_ARTISTS", artists)
  },

  async fetchArtistById({ commit }, artistId) {
    const artist = await ArtistApiService.getArtistById(artistId)
    commit("SET_ARTIST", artist)
  },
  async resetArtists({ commit }) {
    const artists = []
    commit("RESET_ARTISTS", artists)
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
}
