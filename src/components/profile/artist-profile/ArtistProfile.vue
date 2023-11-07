<template>
  <div>
    <CustomCarousel
      :items-count="artworks.length"
      :current-page="currentPage"
      @page-change="handlePageChange"
    >
      <div
        v-for="artwork in displayedArtworks"
        :key="artwork.id"
        class="w-full md:w-1/2 lg:w-1/3 p-4"
      >
        <ArtworkListCardItem @on-delete="fetchArtworks" :artwork="artwork" />
      </div>
    </CustomCarousel>
    <ArtworkForm @update="handleSaveArtwork" />
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import ArtworkApiService from "../../../services/api/ArtworkApiService.js"
import ArtworkListCardItem from "../../artwork/list/ArtworkListCardItem/ArtworkListCardItem.vue"
import CustomCarousel from "../../UI/CustomCarousel.vue"
import ArtworkForm from "./components/forms/ArtworkForm.vue"

export default {
  name: "ArtistProfile",
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { ArtworkForm, CustomCarousel, ArtworkListCardItem },
  data() {
    return {
      isLoading: false,
      artworks: [],
      currentPage: 0,
    }
  },
  async beforeMount() {
    await this.fetchArtworks()
  },
  computed: {
    ...mapGetters("userStore", ["getMe"]),
    displayedArtworks() {
      const startIndex = this.currentPage
      const endIndex = startIndex + 3
      return this.artworks.slice(startIndex, endIndex)
    },
  },
  methods: {
    handlePageChange(newPage) {
      this.currentPage = newPage
    },
    async fetchArtworks() {
      this.artworks = await ArtworkApiService.getArtworks(this.getMe.id)
    },
    handleSaveArtwork() {
      this.fetchArtworks()
    },
  },
}
</script>
<style lang="scss" src="ArtistProfile.scss" />
