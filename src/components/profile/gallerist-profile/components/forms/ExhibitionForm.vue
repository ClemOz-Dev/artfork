<template>
  <section>
    <form @submit.prevent="saveExhibition">
      <BaseInput label="Nom" type="text" name="name" :value="newExhibition.name" :errors="formErrors"
                 @input-changed="inputChange('name', $event)"
      />
      <BaseInput label="Description" type="text" name="description" :value="newExhibition.description"
                 :errors="formErrors"
                 @input-changed="inputChange('description', $event)"/>
      <BaseInput
          label="Date de début de l'exposition"
          type="date"
          name="startDate"
          :value="newExhibition.startDate"
          :errors="formErrors"
          @input-changed="setStartDate($event)"
      />
      <BaseInput
          label="Date de fin de l'exposition"
          type="date"
          name="endDate"
          :value="newExhibition.endDate"
          :errors="formErrors"
          @input-changed="setEndDate( $event)"
      />
      <BaseSelect
          default-value=""
          :options="galleries"
          name="galleryId"
          label="Galeries"
          :errors="formErrors"
          @option-selected="inputChange('galleryId', $event)"
      />
      <MultiSelect :options="artworksData" name="artworks" @options-selected="inputChange('artworks', $event)"
                   :errors="formErrors"/>

      <div class="modal-footer mt-4 flex justify-between">
        <button
            type="button"
            @click="closeModal"
            class="px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-full mr-2"
        >
          Fermer
        </button>
        <button
            type="submit"
            class="confirm px-4 py-2 bg-blue-500 text-white rounded-full"
        >
          Valider
        </button>
      </div>
    </form>
  </section>
</template>

<script>
import {mapGetters} from "vuex"
import MultiSelect from "@/components/form/MultiSelect.vue"
import BaseInput from "@/components/form/BaseInput.vue"
import ArtWorkApiService from "@/services/api/ArtworkApiService"
import BaseSelect from "@/components/form/BaseSelect.vue"
import {toast} from "vue3-toastify";

export default {
  components: {BaseSelect, BaseInput, MultiSelect},
  data() {
    return {
      artworksData: [],
      newExhibition: {
        name: null,
        description: null,
        startDate: null,
        endDate: null,
        galleryId: null,
        artworks: null,
      },
    }
  },
  async beforeMount() {
    await this.fetchArtworks()
    await this.fetchGalleries()
  },
  computed: {
    ...mapGetters("userStore", ["currentUser"]),
    ...mapGetters("galleristStore", ["galleries"]),
    ...mapGetters("exhibitionStore", ["formErrors"]),

  },
  methods: {
    setStartDate(value) {
      const currentDate = new Date().toISOString().split('T')[0];
      if (new Date(value) < new Date(currentDate)) {
        toast.warning("L'exposition doit commencer au minimum aujourd'hui.")
        this.newExhibition.startDate = currentDate;
      }
    },
    setEndDate(value) {
      this.inputChange("endDate", value)
      if (
          this.newExhibition.startDate &&
          this.newExhibition.endDate &&
          new Date(value) < new Date(this.newExhibition.startDate)
      ) {
        toast.warning("La date de fin doit être postérieure à la date de début.")
        this.newExhibition.endDate = this.newExhibition.startDate;
      }
    },
    inputChange(name, value) {
      this.newExhibition[name] = value
    },
    closeModal() {
      this.$emit("close-modal")
    },
    async fetchGalleries() {
      await this.$store.dispatch("galleristStore/fetchGalleries", this.currentUser.id)
    },
    async fetchArtworks() {
      const artworksInExhibition =
          await ArtWorkApiService.getArtworksInExhibition()
      this.artworksData = artworksInExhibition.filter(
          (artwork) => artwork.exhibitions.length === 0,
      )
    },
    async saveExhibition() {
      this.$emit("update", this.newExhibition)
    },

  },
}
</script>

<style lang="scss" scoped>
.nav-button {
  width: 30px;
  border: solid gray 0.5px;
  border-radius: 50%;

  &.next {
    color: #ef4444;
    transform: rotate(180deg);

    &:disabled {
      background-color: #ccc9c9;
    }
  }

}

.confirm {
  background-color: #ef4444;

  &:disabled {
    background-color: #ccc9c9;
  }
}
</style>

