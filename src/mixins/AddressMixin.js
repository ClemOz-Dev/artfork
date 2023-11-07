export default {
  methods: {
    formatFullAddress(item) {
      return `${item.road ?? ""}, ${item.zipcode ?? ""} ${item.city ?? ""}`
    },
    getLocation(item) {
      return `${item.city ?? ""} ${item.country ?? ""}`
    },
    getFullLocation(item) {
      return `${item.road ?? ""} ${item.city ?? ""}`
    },
  },
}
