<template>
  <div>
    <div class="flex flex-col md:flex-row" v-if="artwork">
      <div class="w-1/2 p-4">
        <img :src="artwork.image" alt="Artwork Image" class="w-full h-auto" />
      </div>
      <div class="w-1/2 p-4">
        <div>
          <h1 class="text-xl font-bold">{{ artwork.name }}</h1>
          <p class="text-gray-500">{{ fullName }}</p>
          <button type="button" class="mt-3 p-2 bg-primary text-white rounded">
            Acquérir cette oeuvre
          </button>
        </div>
        <div class="mt-10">
          <h2 class="text-gray-500 pb-3">{{ artwork.category.label }}</h2>
          <p>{{ artwork.description }}</p>
        </div>
      </div>
    </div>
    <div>
      <h1 class="mt-3 text-xl font-bold">Autres oeuvres de la category:</h1>
      <div class="flex flex-wrap">
        <div
          v-for="artwork in otherArtworks"
          :key="artwork.id"
          class="relative w-1/4 p-4"
        >
          <div class="relative">
            <img
              @click="redirectToArtwork(artwork.id)"
              :src="artwork.image"
              :alt="artwork.name"
              class="cursor-pointer w-full h-auto hover:brightness-75"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TheArtworkDetail",
  data() {
    return {
      redirectToArtworkClicked: false,
    }
  },
  computed: {
    artwork() {
      return this.$store.state?.artworkStore?.artwork
    },
    otherArtworks() {
      return this.$store.state?.artworkStore?.artworks.filter(
        (artworks) => artworks.id !== this.artwork.id,
      )
    },
    fullName() {
      return `${this.artwork.artist.firstName} ${this.artwork.artist.lastName}`
    },
  },
  methods: {
    async fetchArtwork(artworkId) {
      const id = artworkId || parseInt(this.$route.params.id, 10)
      await this.$store.dispatch("artworkStore/fetchArtworkById", id)
    },
    async fetchOtherArtworks() {
      const artworkCategoryId = this.artwork.category.id
      await this.$store.dispatch(
        "artworkStore/fetchArtworksByCategory",
        artworkCategoryId,
      )
    },
    redirectToArtwork(artworkId) {
      this.fetchArtwork(artworkId)
      this.$router.push({
        name: "artworks-id",
        params: { id: artworkId },
      })
    },
  },
  async beforeMount() {
    await this.fetchArtwork()
    await this.fetchOtherArtworks()
  },
}
</script>
