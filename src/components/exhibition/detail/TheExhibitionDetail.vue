<template>
  <div class="mb-4 m-4">
    <ExhibitionListCardItem v-if="exhibition" :exhibition="exhibition" />
    <div class="flex flex-wrap">
      <div
        v-for="(artwork, index) in filterArtist"
        :key="index"
        class="w-full sm:w-1/2 lg:w-1/3 p-4 mb-4 shadow-base-200"
      >
        <ArtistListCardItem v-if="artwork.artist" :artist="artwork.artist" />
      </div>
    </div>
    <div class="flex flex-wrap">
      <div
        v-for="(artwork, index) in exhibition.artworks"
        :key="index"
        class="w-full sm:w-1/2 p-4 mb-4 shadow-base-200"
      >
        <ArtworkListCardItem v-if="artwork" :artwork="artwork" />
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-unresolved
import ExhibitionListCardItem from "../list/ExhibitionListCardItem.vue"
import ArtistListCardItem from "../../artist/list/ArtistListCardItem.vue"
import ArtworkListCardItem from "../../artwork/list/ArtworkListCardItem/ArtworkListCardItem.vue"

export default {
  name: "TheExhibitionDetail",
  components: {
    ExhibitionListCardItem,
    ArtistListCardItem,
    ArtworkListCardItem,
  },
  computed: {
    exhibition() {
      return this.$store.state?.exhibitionStore?.exhibition
    },
    filterArtist() {
      const existingArtist = {}
      const isArtist = this.exhibition.artworks.filter((artwork) => {
        if (existingArtist[artwork.artist.id]) return false
        // eslint-disable-next-line no-return-assign
        return (existingArtist[artwork.artist.id] = true)
      })
      return isArtist
    },
  },
  methods: {
    async fetchExhibition() {
      const exhibitionId = parseInt(this.$route.params.id, 10)
      this.$store.dispatch("exhibitionStore/fetchExhibitionById", exhibitionId)
    },
  },
  async beforeMount() {
    await this.fetchExhibition()
  },
}
</script>
