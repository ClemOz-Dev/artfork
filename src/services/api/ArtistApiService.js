import axiosInstance from "../axios.js"

class ArtistApiService {
  /**
   * Asynchronous function to retrieve all artists.
   * @returns {Promise} - A promise containing the response of the request.
   */
  static async getArtists(payload) {
    try {
      const response = await axiosInstance.get(
        `/api/artists?offset=${payload.offset}&limit=${payload.limit}&artworks=${payload.artworks}`,
      )
      return response.data
    } catch (error) {
      console.error("Error fetching artists:", error)
      throw new Error("Error fetching artists")
    }
  }

  /**
   * Asynchronous function to retrieve an artist by their ID.
   * @param {number} id - The ID of the artist to retrieve.
   * @returns {Promise} - A promise containing the response of the request.
   */
  static async getArtistById(id) {
    // API call to get artist information by ID
    return axiosInstance
      .get(`api/artists/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        // Handle errors
        console.error("Error fetching artist by ID:", error)
        throw new Error("Error fetching artist by ID")
      })
  }
}

export default ArtistApiService
