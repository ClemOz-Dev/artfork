<template>
  <div>
    <ModalCustom
        v-if="showModal"
        @close="showModal = false"
        title="Ajouter une galerie"
    >
      <GalleryForm @update="handleSaveGallery" @close-modal="showModal = false"/>
    </ModalCustom>


    <SwipperCarousel :items="galleries">
      <template v-slot="{ item }">
        <GalleryCard :gallery="item"/>
      </template>
    </SwipperCarousel>

    <RoundButton
        style="margin: auto"
        @callback-called="showModal = true"
        explanation="Ajouter une galerie"
    />

  </div>
</template>

<script>
import {mapGetters} from "vuex"
import CustomCarousel from "../../UI/CustomCarousel.vue"
import GalleryForm from "./components/forms/GalleristForm.vue"
import ExhibitionForm from "./components/forms/ExhibitionForm.vue"
import {toast} from "vue3-toastify";
import ModalCustom from "@/components/UI/ModalCustom.vue";
import RoundButton from "@/components/UI/RoundButton.vue";
import SwipperCarousel from "@/components/UI/SwipperCarousel.vue";
import GalleryCard from "@/components/profile/gallerist-profile/GalleryCard.vue";

export default {
  name: "GalleryProfile",
  components: {GalleryCard, SwipperCarousel, RoundButton, ModalCustom, CustomCarousel, ExhibitionForm, GalleryForm},
  data() {
    return {
      isLoading: false,
      showModal: false,
      currentPage: 0,
      showLocations: false,
      localities: [],
      selectedCity: null,
    }
  },
  computed: {
    ...mapGetters("userStore", ["currentUser"]),
    ...mapGetters("galleristStore", ["galleries"]),
  },
  async beforeMount() {
    await this.fetchGalleries()
  },
  methods: {
    handlePageChange(newPage) {
      this.currentPage = newPage
    },
    async fetchGalleries() {
      await this.$store.dispatch("galleristStore/fetchGalleries", this.currentUser.id)
    },
    async handleSaveGallery(formData) {
      try {
        await this.$store.dispatch("galleristStore/addGallery", formData)
        this.showModal = false
      } catch (error) {
        toast.error(error.message)
      }
    },

  },
}
</script>
<style lang="scss">

h3 {
  font-size: 32px;
  font-weight: 700;
}

</style>
