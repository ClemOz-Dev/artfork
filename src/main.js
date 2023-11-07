import { createApp } from "vue"
import Vue3Toastify from "vue3-toastify"
import App from "./App.vue"
import router from "./router/index.js"
import "./index.css"
import "./assets/css/swipper.css"
import "vue3-toastify/dist/index.css"
import store from "./store/index.js"

createApp(App).use(store).use(Vue3Toastify).use(router).mount("#app")
