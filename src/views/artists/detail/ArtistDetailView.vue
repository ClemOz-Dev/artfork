<template>
  <div v-if="artist">
    <ArtistOverview :artist="artist" />
    <div v-if="!artist.artworks">
      <h1>Cette artiste n'a pas encore posté d'oeuvre</h1>
    </div>
    <div v-else>
      <ArtworksArtistList :artworks="artist.artworks" />
    </div>
  </div>
</template>
<script>
import ArtworksArtistList from "@/components/artwork/list/ArtworksArtistList.vue"
import { mapGetters } from "vuex"
import ArtistOverview from "@/views/artists/detail/ArtistOverview.vue"

export default {
  name: "ArtistDetailView",
  components: { ArtistOverview, ArtworksArtistList },
  async beforeMount() {
    await this.fetchArtist()
  },
  computed: {
    ...mapGetters("artistStore", ["artist"]),
  },
  methods: {
    async fetchArtist() {
      const artistId = parseInt(this.$route.params.id, 10)
      this.$store.dispatch("artistStore/fetchArtistById", artistId)
    },
  },
}
</script>
