import axiosInstance from "../axios.js"

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
    console.log({ payload })
    return axiosInstance
      .post("/api/galleries", payload)
      .then((response) => response)
      .catch((error) => {
        throw new Error(error)
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
