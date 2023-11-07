import axiosInstance from "../axios.js"
import AuthLocalService from "../AuthLocalService.js"
import UserApiService from "./UserApiService.js"
import store from "../../store/index.js"

class AuthApiService {
  /**
   * Asynchronous function to authenticate a user.
   * @param {Object} credentials - The user's login credentials.
   * @returns {Promise} - A promise containing the response of the request.
   */
  static async login(credentials) {
    // API call to login using provided credentials
    return axiosInstance
      .post("/auth/login", credentials)
      .then(async (response) => {
        await AuthLocalService.setJwt(response.data.token)
      })
      .catch((error) => {
        throw error.data
      })
  }

  /**
   * Asynchronous function to register a user.
   * @param {Object} credentials - The user's registration credentials.
   * @returns {Promise} - A promise containing the response of the request.
   */
  static async register(credentials) {
    // API call to register using provided credentials
    return axiosInstance
      .post("/auth/register", credentials)
      .then(async (response) => {
        await AuthLocalService.setJwt(response.data.token)
      })
      .catch((error) => {
        throw error.data
      })
  }

  static async forgotPassword(credentials) {
    return axiosInstance
      .post("/auth/forgot-password", credentials)
      .then((response) => {
        return response
      })
      .catch((error) => {
        console.error("Error during sending email:", error.response.data.error)
        throw new Error(error.response.data.error)
      })
  }

  static async resetPassword(credentials, resetToken) {
    return axiosInstance
      .put(`/auth/reset-password/${resetToken}`, credentials)
      .then((response) => {
        return response
      })
      .catch((error) => {
        console.error("Error during reset password:", error.response.data.error)
        throw new Error(error.response.data.error)
      })
  }

  /**
   * Asynchronous function to register a user.
   * @returns {Promise} - A promise containing the response of the request.
   */
  static async fetchCurrentUser() {
    return UserApiService.getCurrentUser().then((user) =>
      store.dispatch("userStore/saveMe", user),
    )
  }
}

export default AuthApiService
