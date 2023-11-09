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
      :src="exhibition.gallery.image ?? '/img/brush.jpg'"
      :alt="exhibition.gallery.description"
    />

    <div class="infos-container">
      <h5 class="artwork-title">
        {{ exhibition.name }}
      </h5>
      <p class="text-xs">Du {{ formatStartDate }} au {{ formatEndDate }}</p>
      <p class="artwork-description">
        {{
          isExhibitionDetailPage
            ? getFullLocation(exhibition.gallery)
            : getLocation(exhibition.gallery)
        }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import DSModal from "@/components/DS/DSModal.vue"
import formatDateToFrench from "@/utils/date"
import AddressMixin from "@/mixins/AddressMixin"

export default {
  name: "ExhibitionCard",
  components: { DSModal },
  emits: ["on-delete"],
  mixins: [AddressMixin],
  props: {
    exhibition: {
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
    isExhibitionPage() {
      return this.$route.name === "exhibitions"
    },
    isExhibitionDetailPage() {
      // "{ name: 'exhibitions-id', params: { id: exhibition.id } }"
      return this.$route.name === "exhibitions-id"
    },
    formatStartDate() {
      return formatDateToFrench(this.exhibition.startDate)
    },
    formatEndDate() {
      return formatDateToFrench(this.exhibition.endDate)
    },
    isOwn() {
      if (this.currentUser) {
        return this.currentUser.id === this.exhibition.userId
      }
      return false
    },
  },
  methods: {
    showDetail() {
      this.$router.push({
        name: "exhibitions-id",
        params: { id: this.exhibition.id },
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
  height: 100%;
  box-sizing: border-box;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  background-color: #424040;
  -webkit-box-shadow: 0 0 12px 3px rgba(73, 73, 73, 0.37);
  box-shadow: 0 0 12px 3px rgba(73, 73, 73, 0.37);

  &:hover {
    cursor: pointer;
  }
}

.artwork-image {
  flex: 1;
  width: 100%;
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
  overflow: auto;
  max-height: 50%;
  border-radius: 0 0 12px 12px;
  border-top: #d7d6d6 solid 0.5px;
  text-align: right;

  .artwork-title {
    font-weight: 600;
    font-size: 24px;
  }
  .artwork-description {
    font-size: 12px;
    font-style: italic;
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
