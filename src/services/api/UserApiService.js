import { toast } from "vue3-toastify"
import axiosInstance from "../axios.js"

class UserApiService {
  /**
   * Asynchronous function to fetch a user by their ID.
   * @param {number} id - The ID of the user to fetch.
   * @returns {Promise} - A promise containing the response of the request.
   */
  static async getUserByById(id) {
    return axiosInstance
      .get(`/api/users/${id}`)
      .then((response) => console.log(response.data))
  }

  static async getCurrentUser() {
    return axiosInstance.get("/api/users/me").then((response) => response.data)
  }

  static async updateUser(userId, payload) {
    return axiosInstance
      .put(`/api/users/${userId}`, payload)
      .then((response) => {
        toast.success("Modification de votre profil effectuée")
        return response
      })
      .catch(() => {
        toast.error(
          "Une erreur est survenue l'hors de la modification de votre profil",
        )
        throw new Error("Error creating artwork")
      })
  }
}

export default UserApiService
