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
        <ArtworkCard @on-delete="fetchArtworks" :artwork="artwork" />
      </div>
    </CustomCarousel>

    <RoundButton style="margin: auto" @callback-called="showModal = true" />

    <ModalCustom
      v-if="showModal"
      @close="showModal = false"
      title="Ajouter une oeuvre"
    >
      <ArtworkForm
        @update="handleSaveArtwork"
        @close-modal="showModal = false"
        :is-loading="isLoading"
      />
    </ModalCustom>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import { toast } from "vue3-toastify"
import ArtworkApiService from "@/services/api/ArtworkApiService"
import ArtworkCard from "@/components/artwork/ArtworkCard.vue"
import ModalCustom from "@/components/UI/ModalCustom.vue"
import CustomCarousel from "@/components/UI/CustomCarousel.vue"
import RoundButton from "@/components/UI/RoundButton.vue"
import ArtworkForm from "./ArtworkForm.vue"

export default {
  name: "ArtistProfile",
  components: {
    ModalCustom,
    RoundButton,
    ArtworkForm,
    CustomCarousel,
    ArtworkCard,
  },
  data() {
    return {
      showModal: false,
      isLoading: false,
      artworks: [],
      currentPage: 0,
    }
  },
  async beforeMount() {
    await this.fetchArtworks()
  },
  computed: {
    ...mapGetters("userStore", ["currentUser"]),
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
      this.artworks = await ArtworkApiService.getArtworks(this.currentUser.id)
    },
    async handleSaveArtwork(formData) {
      try {
        this.isLoading = true
        await this.$store.dispatch("artworkStore/addArtwork", formData)
        this.artworks = await ArtworkApiService.getArtworks(this.currentUser.id)
        this.showModal = false
      } catch (error) {
        toast.error(error.message)
      }
      this.isLoading = false
    },
  },
}
</script>
<style lang="scss" scoped>
.add-artwork {
  padding: 50px;
}

.add-artwork button {
  background: #ef4444;
  height: 40px;
  color: white;
  font-weight: 700;
  width: 315px;
  border-radius: 6.7px;
  margin-top: 2rem;
}

.add-artwork-form {
  width: 50%;
  display: flex;
  flex-wrap: wrap;
}

h3 {
  font-size: 32px;
  font-weight: 700;
}

/*Média-queries*/
@media all and (max-width: 768px) {
  .add-artwork {
    padding: 0;
    margin-top: 40px;
  }

  .add-artwork button {
    width: 100%;
  }

  .add-artwork-form {
    width: 100%;
  }
}
</style>
