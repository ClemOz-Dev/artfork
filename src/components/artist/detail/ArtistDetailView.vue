<template>
  <div v-if="artist">
    <div class="flex items-start mb-4 ms-4">
      <ArtistCard :artist="artist" />
    </div>
    <div v-if="!artist.artworks">
      <h1>Cette artiste n'a pas encore posté d'oeuvre</h1>
    </div>
    <div v-else>
      <ArtworksList :artworks="artist.artworks" />
    </div>
  </div>
</template>
<script>
import ArtworksList from "@/components/artwork/list/ArtworkListCard.vue"
import ArtistCard from "@/components/artist/list/ArtistCard.vue"
import { mapGetters } from "vuex"

export default {
  name: "ArtistDetailView",
  components: { ArtworksList, ArtistCard },
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
