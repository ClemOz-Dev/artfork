import axiosInstance from "../axios.js"
import {toast} from "vue3-toastify";

class GalleryApiService {
  /**
   * Asynchronous function to retrieve all galleries.
   * @returns {Promise} - A promise containing the response of the request.
   */
  static async getGalleries() {
    // API call to get all galleries
    return axiosInstance
      .get("/api/galleries")
      .then((response) => response.data)
      .catch((error) => {
        // Handle errors
        console.error("Error fetching galleries:", error)
        throw new Error("Error fetching galleries")
      })
  }

  /**
   * Asynchronous function to retrieve a gallery by its ID.
   * @param {number} id - The ID of the gallery to retrieve.
   * @returns {Promise} - A promise containing the response of the request.
   */
  static async getGalleryById(id) {
    // API call to get gallery information by ID
    return axiosInstance
      .get(`/api/galleries/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        // Handle errors
        console.error("Error fetching gallery by ID:", error)
        throw new Error("Error fetching gallery by ID")
      })
  }

  /**
   * Asynchronous function to create a gallerie.
   * @returns {Promise} - A promise containing the response of the request.
   * @param payload
   */
  static async createGallery(payload) {

    return axiosInstance
      .post("/api/galleries", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
       .then((response) => {
        toast.success("Gallerie créée avec succès")
        return response
      })
      .catch((e) => {
        if (e.status === 422) {
          throw e.data
        }
        const errorMessage = e.data.error ?? "Erreur lors de la création."
        toast.error(errorMessage)
      })
  }

  /**
   * Asynchronous function to retrieve all galleries.
   * @returns {Promise} - A promise containing the response of the request.
   */
  static async getGalleriesByGallerist(galleristId) {
    const params = {}

    if (galleristId !== null) {
      params.gallerist = galleristId
    }
    return axiosInstance
      .get("/api/galleries", { params })
      .then((response) => response.data)
      .catch((error) => {
        // Handle errors
        console.error("Error fetching galleries:", error)
        throw new Error("Error fetching galleries")
      })
  }
}

export default GalleryApiService
