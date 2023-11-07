import { toast } from "vue3-toastify"
import axiosInstance from "../axios.js"

class ArtWorkApiService {
  /**
   * Asynchronous function to retrieve all artworks.
   * @returns {Promise} - A promise containing the response of the request.
   */
  static async getArtworks(artistId = null) {
    // API call to get all artworks
    const params = {}

    if (artistId !== null) {
      params.artist = artistId
    }

    return axiosInstance
      .get("/api/artworks", { params })
      .then((response) => response.data)
      .catch((error) => {
        // Handle errors
        console.error("Error fetching artworks:", error)
        throw new Error("Error fetching artworks")
      })
  }

  static async getArtworksWithArtistName() {
    // API call to get all artworks
    return axiosInstance
      .get("/api/artworks/artist")
      .then((response) => response.data)
      .catch((error) => {
        // Handle errors
        console.error("Error fetching artworks:", error)
        throw new Error("Error fetching artworks")
      })
  }

  static async getArtworksInExhibition() {
    // API call to get all artworks
    return axiosInstance
      .get("/api/artworks/exhibitions")
      .then((response) => response.data)
      .catch((error) => {
        // Handle errors
        console.error("Error fetching artworks:", error)
        throw new Error("Error fetching artworks")
      })
  }

  /**
   * Asynchronous function to retrieve an artwork by its ID.
   * @param {number} id - The ID of the artwork to retrieve.
   * @returns {Promise} - A promise containing the response of the request.
   */
  static async getArtWorkById(id) {
    // API call to get artwork information by ID
    return axiosInstance
      .get(`/api/artworks/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        // Handle errors
        console.error("Error fetching artwork by ID:", error)
        throw new Error("Error fetching artwork by ID")
      })
  }

  static async getArtworksByCategory(categoryId) {
    // API call to get artists by category
    return axiosInstance
      .get(`api/artworks/category/${categoryId}`)
      .then((response) => response.data)
      .catch((error) => {
        // Handle errors
        console.error("Error fetching artworks by category:", error)
        throw new Error("Error fetching artworks by category")
      })
  }

  /**
   * Asynchronous function to create an artwork.
   * @returns {Promise} - A promise containing the response of the request.
   * @param payload
   */
  static async createArtwork(payload) {
    return axiosInstance
      .post("/api/artworks", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        toast.success("Oeuvre créé avec succès")
        return response
      })
      .catch(() => {
        toast.error("Erreur l'hors de la création d'une oeuvre")
        throw new Error("Error creating artwork")
      })
  }

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

  /**
   * Asynchronous function to delete an artwork by its ID.
   * @param {number} id - The ID of the artwork to retrieve.
   * @returns {Promise} - A promise containing the response of the request.
   */
  static async deleteArtwork(id) {
    return axiosInstance
      .delete(`/api/artworks/${id}`)
      .then((response) => {
        toast.success("Oeuvre supprimé avec succès")
        return response
      })
      .catch(() => {
        toast.error("Erreur l'hors de la suppression d'une oeuvre")
        throw new Error("Error creating artwork")
      })
  }
}

export default ArtWorkApiService
