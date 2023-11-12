export default {
    methods: {
        formatFullAddressBroken(item) {
            return `${item.road ?? ""},<br>${item.zipcode ?? ""} ${item.city ?? ""}`;
        },
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
