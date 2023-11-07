import ArtworkApiService from "../services/api/ArtworkApiService.js"

const state = () => ({
  artworks: [],
  artwork: null,
})

const mutations = {
  SET_ARTWORKS(state, artworks) {
    state.artworks = artworks
  },
  SET_ARTWORK(state, artwork) {
    state.artwork = artwork
  },
  SET_ARTWORKS_WITH_ARTIST(state, artworks) {
    state.artworks = artworks
  },
}

const actions = {
  async fetchArtWorks({ commit }, payload = null) {
    const artworks = await ArtworkApiService.getArtworks(payload)
    commit("SET_ARTWORKS", artworks.data)
  },

  async fetchArtWorksWithArtistName({ commit }) {
    const artworks = await ArtworkApiService.getArtworksWithArtistName()
    commit("SET_ARTWORKS_WITH_ARTIST", artworks)
  },

  async fetchArtworkById({ commit }, artworkId) {
    const artwork = await ArtworkApiService.getArtWorkById(artworkId)
    commit("SET_ARTWORK", artwork)
  },

  async fetchArtworksByCategory({ commit }, categoryId) {
    const artworks = await ArtworkApiService.getArtworksByCategory(categoryId)
    commit("SET_ARTWORKS", artworks)
  },

  async addArtwork({ dispatch }, artwork) {
    await ArtworkApiService.createArtwork(artwork)
    await dispatch("fetchArtWorks")
  },

  async deleteArtworkById({ dispatch }, artworkId) {
    await ArtworkApiService.deleteArtwork(artworkId)
    await dispatch("fetchArtWorks")
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
}
