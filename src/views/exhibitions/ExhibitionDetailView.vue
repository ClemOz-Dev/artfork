<template>
  <div class="mb-4 m-4"  v-if="exhibition" >
    <div class="flex flex-col md:flex-row">
      <div class="w-2/5 p-4">
        <img :src="exhibition.gallery.image" :alt="exhibition.gallery.description" class="w-full h-auto" />
      </div>
      <div class="w-1/2 p-4">
        <div>

        </div>
        <div class="mt-10">
          <h2 class="exhibition-location text-gray-500 pb-3">{{ getFullLocation(exhibition.gallery) }}</h2>
          <p class="exhibition-date">Du {{ formatStartDate }} au {{ formatEndDate }}</p>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap">
      <div
        v-for="(artwork, index) in filterArtist"
        :key="index"
        class="w-full sm:w-1/2 lg:w-1/3 p-4 mb-4 shadow-base-200"
      >
        <ArtistCardFull v-if="artwork.artist" :artist="artwork.artist" />
      </div>
    </div>
    <div class="flex flex-wrap">
      <div
        v-for="(artwork, index) in exhibition.artworks"
        :key="index"
        class="w-full sm:w-1/2 p-4 mb-4 shadow-base-200"
      >
        <ArtworkCard v-if="artwork" :artwork="artwork" />
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-unresolved
import ExhibitionListCardItem from "@/components/exhibition/list/ExhibitionListCardItem.vue"
import ArtistCardFull from "@/components/artist/list/ArtistCardFull.vue"
import ArtworkCard from "@/components/artwork/list/ArtworkListCardItem/ArtworkListCardItem.vue";
import formatDateToFrench from "@/utils/date.js";
import AddressMixin from "@/mixins/AddressMixin.js";

export default {
  name: "TheExhibitionDetail",
  mixins: [AddressMixin],
  components: {
    ArtworkCard,
    ExhibitionListCardItem,
    ArtistCardFull,
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
      formatStartDate() {
      return formatDateToFrench(this.exhibition.startDate)
    },
    formatEndDate() {
      return formatDateToFrench(this.exhibition.endDate)
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
<style scoped lang="scss">
.exhibition-location {
  font-size: 32px;
  font-weight: 800;
  color: black;
}

.exhibition-date {
  font-size: 18px;
  font-style: italic;
}

</style>