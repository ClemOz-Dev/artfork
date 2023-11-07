import axiosInstance from "../axios.js"

class CategoryApiService {
  /**
   * Asynchronous function to create an artwork.
   * @returns {Promise} - A promise containing the response of the request.
   */
  static async getCategories() {
    return axiosInstance
      .get("/api/categories")
      .then((response) => response.data)
      .catch(() => {
        throw new Error("Error fetching categories")
      })
  }
}

export default CategoryApiService
