import axiosInstance from "../axios.js"

export default class LocalisationService {
  static async fetchLocalities(value) {
    try {
      const url = `https://apicarto.ign.fr/api/codes-postaux/communes/${value}`
      const response = await axiosInstance.get(url)
      return response.data
    } catch (e) {
      return [
        {
          error: "Aucune commune ne correspond",
        },
      ]
    }
  }
}
