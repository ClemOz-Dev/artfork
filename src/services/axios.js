import axios from "src/services/axios.js"
import AuthLocalService from "./AuthLocalService.js"
import router from "../router/index.js"

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
})

const authRoutes = [
  "/api/users/me",
  "/api/artworks",
  "/api/galleries",
  "/api/users/",
]

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      const { status } = error.response
      if (status === 404) {
        return Promise.reject(error.response)
      }
      if (status === 401) {
        console.error("Vous n'êtes pas autorisés")
        return Promise.reject(error.response)
      }
      if (status === 500) {
        // await router.push("/internal-server-error")
         return Promise.reject(error.response)
      } else {
        return Promise.reject(error.response)
      }
    } else if (error.request) {
      console.error(
        "La requête n'a pas abouti. Vérifiez votre connexion Internet ou réessayez plus tard.",
      )
    } else {
      console.error(
        "Une erreur inattendue s'est produite. Veuillez réessayer plus tard.",
      )
    }
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.request.use(async (config) => {
  if (authRoutes.some((route) => new RegExp(route).test(config.url))) {
    const token = await AuthLocalService.getJwt()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

export default axiosInstance
