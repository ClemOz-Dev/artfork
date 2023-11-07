<template>
  <section>
    <h2
      class="w-9/12 text-2xl relative font-black mt-5 mb-2 text-center md:text-left"
    >
      Les Oeuvres
    </h2>
    <ArtworkListCard :artworks="artworks" />
  </section>
  <section>
    <h2
      class="w-9/12 text-2xl relative font-black mt-5 mb-2 text-center md:text-left"
    >
      Les Artistes
    </h2>
    <ArtistListCardItemCaroussel />
  </section>
  <section>
    <h2
      class="w-9/12 text-2xl relative font-black mt-5 mb-2 text-center md:text-left"
    >
      Les Expositions
    </h2>
    <div class="mx-auto w-full max-w-screen-lg">
      <ExhibitionsList
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
      />
    </div>
  </section>
</template>
<script>
import ArtistListCardItemCaroussel from "../components/artist/list/ArtistListCardItemCaroussel.vue"
import ArtworkListCard from "../components/artwork/list/ArtworkListCard.vue"
import ExhibitionsList from "../components/exhibition/list/TheExhibitionsList.vue"

export default {
  name: "HomeView",
  components: { ArtworkListCard, ArtistListCardItemCaroussel, ExhibitionsList },
  computed: {
    artworks() {
      return this.$store.state.artworkStore.artworks
    },
  },
  beforeMount() {
    this.fetchArtWorksWithArtistName()
  },
  methods: {
    async fetchArtWorksWithArtistName() {
      this.$store.dispatch("artworkStore/fetchArtWorksWithArtistName")
    },
  },
}
</script>
