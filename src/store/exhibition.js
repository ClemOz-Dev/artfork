import ExhibitionApiService from "@/services/api/ExhibitionApiService"
import store from "@/store/index.js";

const state = () => ({
    exhibitions: [],
    exhibition: null,
    form_errors: {},
})

const mutations = {
    SET_EXHIBITIONS(state, exhibitions) {
        state.exhibitions = exhibitions
    },
    SET_EXHIBITION(state, exhibition) {
        state.exhibition = exhibition
    },
    SET_FORM_ERRORS(state, errors) {
        state.form_errors = errors
    },
}

const actions = {
    async fetchExhibitions({commit}, galleryId = null) {
        const exhibitions = await ExhibitionApiService.getExhibitions(galleryId)
        commit("SET_EXHIBITIONS", exhibitions)
    },


    async fetchExhibitionById({commit}, exhibitionId) {
        const exhibition =
            await ExhibitionApiService.getExhibitionById(exhibitionId)
        commit("SET_EXHIBITION", exhibition)
    },

    async addExhibition({dispatch, commit}, payload) {
        await ExhibitionApiService.createExhibition(payload)
            .then(() => dispatch("fetchExhibitions", payload.galleryId))
            .catch((errors) => {
                commit("SET_FORM_ERRORS", errors)
                throw Error("La création de l'exposition a échoué.")
            })
    },
}

const getters = {
    exhibitions: (state) => state.exhibitions,
    formErrors: (state) => state.form_errors,
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
