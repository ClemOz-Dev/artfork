import { createStore } from "vuex"
import artistStore from "./artist.js"
import artworkStore from "./artwork.js"
import authStore from "./auth.js"
import categoryStore from "./category.js"
import exhibitionStore from "./exhibition.js"
import userStore from "./user.js"

const store = createStore({
  modules: {
    artistStore,
    artworkStore,
    authStore,
    categoryStore,
    exhibitionStore,
    userStore,
  },
})

export default store
