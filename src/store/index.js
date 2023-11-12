import { createStore } from "vuex"
import artistStore from "./artist"
import artworkStore from "./artwork"
import authStore from "./auth"
import categoryStore from "./category"
import exhibitionStore from "./exhibition"
import galleristStore from "./gallerist"
import userStore from "./user"

const store = createStore({
  modules: {
    artistStore,
    artworkStore,
    authStore,
    categoryStore,
    exhibitionStore,
    userStore,
    galleristStore,
  },
})

export default store
