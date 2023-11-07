<template>
  <ArtistCard :artists="artists" />
</template>

<script>
import ArtistCard from "./ArtistListCard.vue"

export default {
  components: { ArtistCard },
  computed: {
    artists() {
      return this.$store.state.artistStore.artists
    },
  },
  beforeMount() {
    this.fetchArtists()
  },
  async beforeUnmount() {
    await this.$store.dispatch("artistStore/resetArtists")
  },
  methods: {
    async fetchArtists() {
      const payload = {
        offset: 0,
        limit: 100,
        artworks: false,
      }
      this.$store.dispatch("artistStore/fetchArtists", payload)
    },
  },
}
</script>
