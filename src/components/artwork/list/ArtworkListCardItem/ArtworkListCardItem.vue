<template>
  <DSModal v-if="showModal" @validate="deleteArtwork" @cancel="closeModal">
    <template #actions>
      <p class="mb-4">Êtes-vous sûr de vouloir supprimer cette oeuvre ?</p>
    </template>
  </DSModal>
  <div v-if="artwork" class="artwork-slide-content">
    <div class="image-container">
      <img
        v-if="artwork.image"
        :class="{ imgClass, 'hover:brightness-75': isClickable }"
        :src="artwork.image"
        alt="Artwork Image"
      />
      <div
        v-if="isOwn"
        class="cross-red transform rotate-45"
        @click="openDeleteModal"
      >
        <p>+</p>
      </div>
    </div>

    <div class="flex flex-col text-start">
      <h3 class="artwork-title font-bold">{{ artwork.name }}</h3>
      <div v-if="artwork.user">
        <p class="text-sm">{{ getFullname }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex"
import DSModal from "../../../DS/DSModal.vue"

export default {
  name: "ArtworkListCardItem",
  components: { DSModal },
  emits: ["on-delete"],
  props: {
    artwork: {
      type: Object,
      required: true,
    },
    isClickable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showModal: false,
    }
  },
  computed: {
    ...mapGetters("userStore", ["currentUser"]),
    isOwn() {
      if (this.currentUser) {
        return this.currentUser.id === this.artwork.currentUser
      }
      return false
    },
    getFullname() {
      const user = JSON.parse(JSON.stringify(this.artwork.user))
      return `${user.first_name} ${user.last_name}`
    },
    isExhibitionDetailPage() {
      return this.$route.name === "exhibitions-id"
    },
  },
  methods: {
    imgClass() {
      return {
        "w-9/12 h-9/12 ": this.isHomePage,
        "w-6/12 h-6/12 ": this.isExhibitionDetailPage,
      }
    },
    async deleteArtwork() {
      await this.$store.dispatch(
        "artworkStore/deleteArtworkById",
        this.artwork.id,
      )
      this.closeModal()
      this.$emit("on-delete")
    },
    openDeleteModal() {
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
    },
  },
}
</script>
<style scoped lang="scss" src="./ArtworkListCardItem.scss" />
