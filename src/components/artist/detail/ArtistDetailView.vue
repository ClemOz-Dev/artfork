<template>
  <div v-if="artist">
    <ArtistOverview :artist="artist" />
    <div v-if="!artist.artworks">
      <h1>Cette artiste n'a pas encore posté d'oeuvre</h1>
    </div>
      <div class="flex flex-wrap">
      <div
        v-for="(artwork, index) in artist.artworks"
        :key="index"
        class="w-full sm:w-1/2 p-4 mb-4 shadow-base-200"
      >
        <ArtworkCard :artwork="artwork" />
      </div>
    </div>
  </div>
</template>
<script>
import ArtworksList from "@/components/artwork/list/ArtworkListCard.vue"
import { mapGetters } from "vuex"
import ArtistOverview from "./ArtistOverview.vue"
import ArtworkCard from "@/components/artwork/list/ArtworkListCardItem/ArtworkListCardItem.vue";

export default {
  name: "ArtistDetailView",
  components: {ArtworkCard, ArtistOverview, ArtworksList },
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
