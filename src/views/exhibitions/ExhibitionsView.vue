<template>
  <ModalCustom
      v-if="showModal"
      @close="showModal = false"
      title="Ajouter une exposition"
  >
    <ExhibitionForm
        @update="handleSaveExhibition"
        @close-modal="showModal = false"
    />
  </ModalCustom>
  <MainHeader>
    <template #title>
      {{ title }}
    </template>
  </MainHeader>
  <SpinningLoader v-if="isLoading"/>
  <ExhibitionsList v-if="exhibitions.length > 0" :exhibitions="exhibitions"/>
  <p class="no-exhibition" v-else>Aucune exposition n'a été trouvée.</p>
  <RoundButton
      v-if="isGallerist"
      style="margin: auto"
      @callback-called="showModal = true"
      explanation="Ajouter une exposition"
  />
</template>
<script>
import MainHeader from "@/components/layout/MainHeader.vue"
import ExhibitionsList from "@/components/exhibition/list/TheExhibitionsList.vue"
import SpinningLoader from "@/components/UI/SpinningLoader.vue";
import {mapGetters} from "vuex";
import RoundButton from "@/components/UI/RoundButton.vue";
import {toast} from "vue3-toastify";
import ModalCustom from "@/components/UI/ModalCustom.vue";
import ExhibitionForm from "@/components/profile/gallerist-profile/components/forms/ExhibitionForm.vue";
import UserService from "@/services/business/User.js";

export default {
  name: "ExhibitionPage",
  components: {ExhibitionForm, ModalCustom, RoundButton, SpinningLoader, MainHeader, ExhibitionsList},
  data() {
    return {
      showModal: false,
      isLoading: false,
      title: "Les Expositions",
    }
  },
  computed: {
    ...mapGetters("userStore", ["currentUser"]),
    ...mapGetters("exhibitionStore", ["exhibitions"]),
    isGallerist() {
      if (this.currentUser) {
        return UserService.isGallerist(this.currentUser)
      }
      return false
    },
  },
  async beforeMount() {
    this.isLoading = true
    const galerieId = this.$route.query.galerie;
    await this.fetchExhibitions(galerieId)
    this.isLoading = false
  },
  methods: {
    async fetchExhibitions(galerieId) {
      this.$store.dispatch("exhibitionStore/fetchExhibitions", galerieId)
    },
    async handleSaveExhibition(payload) {
      console.log("PAY: ", payload)
      try {
        await this.$store.dispatch("exhibitionStore/addExhibition", payload)
        this.showModal = false
      } catch (error) {
        toast.error(error.message)
      }
    }
  }
}
</script>

<style scoped>
.no-exhibition {
  text-align: center;
  margin: 24px;
}
</style>
