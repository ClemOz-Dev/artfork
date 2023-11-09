<template>
  <DSModal v-if="showModal" @validate="deleteArtwork" @cancel="closeModal">
    <template #actions>
      <p class="mb-4">Êtes-vous sûr de vouloir supprimer cette oeuvre ?</p>
    </template>
  </DSModal>
  <div class="card-container" @click="showDetail">
    <div
      v-if="isOwn"
      class="cross-red transform rotate-45"
      @click="openDeleteModal"
    >
      <p>+</p>
    </div>

    <img
      class="artwork-image"
      :src="artwork.image ?? '/img/brush.jpg'"
      :alt="artwork.description"
    />

    <div class="infos-container">
      <a href="#">
        <h5 class="artwork-title">
          {{ artwork.name }}
        </h5>
      </a>
      <p class="artwork-description">
        {{ artwork.description }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import DSModal from "@/components/DS/DSModal.vue"

export default {
  name: "ArtworkCard",
  components: { DSModal },
  emits: ["on-delete"],
  props: {
    artwork: {
      type: Object,
      required: true,
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
        return this.currentUser.id === this.artwork.userId
      }
      return false
    },
    isExhibitionDetailPage() {
      return this.$route.name === "exhibitions-id"
    },
  },
  methods: {
    showDetail() {
      this.$router.push({
        name: "artworks-id",
        params: { id: this.artwork.id },
      })
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

<style scoped lang="scss">
.card-container {
  position: relative;
  width: 100%;
  padding: 0;

  min-height: 250px;
  box-sizing: border-box;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  background-color: transparent;
  -webkit-box-shadow: 0 0 12px 3px rgba(73, 73, 73, 0.37);
  box-shadow: 0 0 12px 3px rgba(73, 73, 73, 0.37);
  &:hover {
    cursor: pointer;
  }
}

.artwork-image {
  flex: 1;
  width: 100%;
    background-color: transparent;
  border-radius: 12px;
  object-fit: fill;
}

.infos-container {
  background: rgba(255, 255, 255, 0.8);
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 1rem;
  overflow: hidden;
  max-height: 30%;
  border-radius: 0 0 12px 12px;
  border-top: #d7d6d6 solid 0.5px;
  text-align: right;

  .artwork-title {
    font-weight: 600;
    font-size: 1.2rem;
        overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .artwork-description {
    font-size: 12px;
    font-style: italic;
       overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

.cross-red {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: rgba(248, 140, 69, 0.2);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.57);
  backdrop-filter: blur(9px);
  -webkit-backdrop-filter: blur(9px);

  &:hover {
    cursor: pointer;
  }

  p {
    color: #f25c54;
    font-size: 32px;

    &:hover {
      scale: 1.3;
    }
  }
}
</style>
