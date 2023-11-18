import axiosInstance from "../axios.js"
import {toast} from "vue3-toastify";

class ExhibitionApiService {
    /**
     * Asynchronous function to retrieve all exhibitions.
     * @returns {Promise} - A promise containing the response of the request.
     */
    static async getExhibitions(galleryId = null) {
        const params = {}

        if (galleryId !== null) {
            params.gallery = galleryId;
        }

        try {
            const response = await axiosInstance.get('/api/exhibitions', {params})
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
            .catch((e) => {
                if (e.status === 422) {
                    throw e.data
                }
                const errorMessage = e.data.error ?? "Erreur lors de la création."
                toast.error(errorMessage)
            })
    }
}

export default ExhibitionApiService
