<template>
  <div class="flex items-start mb-4 ms-4" v-if="artist">
    <ArtistListCardItem :artist="artist" />
  </div>
  <div v-if="!artist.artworks">
    <h1>Cette artiste n'a pas encore posté d'oeuvre</h1>
  </div>
  <div v-else>
    <ArtworkListCard :artworks="artist.artworks" />
  </div>
</template>
<script>
import ArtworkListCard from "../../artwork/list/ArtworkListCard.vue"
import ArtistListCardItem from "../list/ArtistListCardItem.vue"

export default {
  name: "TheArtistDetail",
  components: { ArtworkListCard, ArtistListCardItem },
  computed: {
    artist() {
      return this.$store.state?.artistStore?.artist
    },
  },
  methods: {
    async fetchArtist() {
      const artistId = parseInt(this.$route.params.id, 10)
      this.$store.dispatch("artistStore/fetchArtistById", artistId)
    },
  },
  async beforeMount() {
    await this.fetchArtist()
  },
}
</script>
