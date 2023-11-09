<template>
  <section>
    <h2
      class="w-9/12 text-2xl relative font-black mt-5 mb-2 text-center md:text-left"
    >
      Les Oeuvres
    </h2>
    <SwipperCarousel :items="artworks">
      <template v-slot="{ item }">
        <ArtworkCard :artwork="item" />
      </template>
    </SwipperCarousel>
  </section>
  <section>
    <h2
      class="w-9/12 text-2xl relative font-black mt-5 mb-2 text-center md:text-left"
    >
      Les Artistes
    </h2>
    <SwipperCarousel :items="artists" :displayed-count="5">
      <template v-slot="{ item }">
        <ArtistCard :artist="item" />
      </template>
    </SwipperCarousel>
  </section>
  <section>
    <h2
      class="w-9/12 text-2xl relative font-black mt-5 mb-2 text-center md:text-left"
    >
      Les Expositions
    </h2>
    <SwipperCarousel :items="exhibitions">
      <template v-slot="{ item }">
        <ExhibitionCard :exhibition="item" />
      </template>
    </SwipperCarousel>
  </section>
</template>
<script>
import SwipperCarousel from "@/components/UI/SwipperCarousel.vue"
import ArtistCard from "@/components/artist/list/ArtistListCard.vue"
import ArtworkCard from "@/components/artwork/list/ArtworkListCardItem/ArtworkListCardItem.vue"
import { mapGetters } from "vuex"
import ExhibitionCard from "@/components/exhibition/list/ExhibitionListCardItem.vue"

export default {
  name: "HomeView",
  components: {
    ExhibitionCard,
    ArtworkCard,
    ArtistCard,
    SwipperCarousel,
  },
  computed: {
    ...mapGetters("artworkStore", ["artworks"]),
    ...mapGetters("artistStore", ["artists"]),
    ...mapGetters("exhibitionStore", ["exhibitions"]),
    artworks() {
      return this.$store.state.artworkStore.artworks
    },
  },
  async beforeMount() {
    await this.fetchArtWorksWithArtistName()
    await this.fetchArtists()
    await this.fetchExhibitions()
  },
  methods: {
    async fetchArtWorksWithArtistName() {
      this.$store.dispatch("artworkStore/fetchArtWorksWithArtistName")
    },
    async fetchArtists() {
      const payload = {
        offset: 0,
        limit: 100,
        artworks: false,
      }
      this.$store.dispatch("artistStore/fetchArtists", payload)
    },
    async fetchExhibitions() {
      this.$store.dispatch("exhibitionStore/fetchExhibitions")
    },
  },
}
</script>
