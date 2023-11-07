import axiosInstance from "../axios.js"

class ExhibitionApiService {
  /**
   * Asynchronous function to retrieve all exhibitions.
   * @returns {Promise} - A promise containing the response of the request.
   */
  static async getExhibitions() {
    // API call to get all exhibitions
    try {
      const response = await axiosInstance.get(`/api/exhibitions`)
      return response.data
    } catch (error) {
      console.error("Error fetching exhibtions:", error)
      throw new Error("Error fetching exhibtions")
    }
  }

  /**
   * Asynchronous function to retrieve an exhibition by its ID.
   * @param {number} id - The ID of the exhibition to retrieve.
   * @returns {Promise} - A promise containing the response of the request.
   */
  static async getExhibitionById(id) {
    // API call to get exhibition information by ID
    try {
      const response = await axiosInstance.get(`/api/exhibitions/${id}`)
      return response.data
    } catch (error) {
      console.error("Error fetching exhibtions:", error)
      throw new Error("Error fetching exhibtions")
    }
  }

  /**
   * Asynchronous function to create an exhibition.
   * @returns {Promise} - A promise containing the response of the request.
   * @param payload
   */
  static async createExhibition(payload) {
    return axiosInstance
      .post("/api/exhibitions", payload)
      .then((response) => response)
      .catch(() => {
        throw new Error("Error fetching artwork by ID")
      })
  }
}

export default ExhibitionApiService
