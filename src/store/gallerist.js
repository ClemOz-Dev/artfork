import GalleryApiService from "../services/api/GalleryApiService"
import ArtworkApiService from "@/services/api/ArtworkApiService.js";
import store from "@/store/index.js";

const state = () => ({
    galleries: [],
    form_errors: {},

})

const mutations = {
    SET_GALLERIES(state, galleries) {
        state.galleries = galleries
    },
    SET_FORM_ERRORS(state, errors) {
        state.form_errors = errors
    },
}

const actions = {
    async fetchGalleries({commit}, userId) {
        try {
            const galleries = await GalleryApiService.getGalleriesByGallerist(userId)
            commit("SET_GALLERIES", galleries)
        } catch (e) {
            throw e
        }
    },
    async addGallery({dispatch, commit}, payload) {
        await GalleryApiService.createGallery(payload)
            .then(() => dispatch("fetchGalleries", store.state.userStore.current_user.id))
            .catch((errors) => {
                commit("SET_FORM_ERRORS", errors)
                throw Error("La création de la galerie a échoué.")
            })
    },
}

const getters = {
    formErrors: (state) => state.form_errors,
    galleries: (state) => state.galleries,
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters,
}
