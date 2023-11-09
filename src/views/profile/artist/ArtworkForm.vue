<template>
  <section class="add-artwork">
    <form class="add-artwork-form" @submit.prevent="saveArtwork" ref="form">
      <BaseInput
        :value="name"
        type="text"
        name="name"
        label="Nom de l'Œuvre"
        :errors="formErrors"
        class="mr-2"
        @input-changed="inputChange('name', $event)"
      />
      <BaseInput
        label="Image de l'Œuvre"
        type="file"
        name="image"
        :errors="formErrors"
        @change="handleFileChange"
      />
      <BaseInput
        label="Description de l'Œuvre"
        type="text"
        name="description"
        :value="description"
        :errors="formErrors"
        class="mr-2"
        @input-changed="inputChange('description', $event)"
      />
      <BaseSelect
        label="Catégorie de l'Œuvre"
        default-value="Sélectionnez une catégorie"
        :options="categories"
        name="categoryId"
        :errors="formErrors"
        @category-selected="selectChange"
      />
      <div v-if="isLoading" class="mt-4">
        <SpinningLoader />
      </div>

      <div v-else class="modal-footer mt-4 flex justify-between">
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
import { mapGetters } from "vuex"
import BaseInput from "../../../components/form/BaseInput.vue"
import appendIfNotNull from "../../../utils/form"
import BaseSelect from "../../../components/form/BaseSelect.vue"
import SpinningLoader from "../../../components/UI/SpinningLoader.vue"

export default {
  components: { SpinningLoader, BaseSelect, BaseInput },
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      name: null,
      description: null,
      categoryId: null,
      selectedFile: null,
    }
  },
  computed: {
    ...mapGetters("categoryStore", ["categories"]),
    ...mapGetters("artworkStore", ["formErrors"]),
  },
  async beforeMount() {
    await this.$store.dispatch("categoryStore/fetchCategories")
  },
  methods: {
    closeModal() {
      this.$emit("close-modal")
    },
    selectChange(value) {
      this.categoryId = value
    },
    inputChange(name, value) {
      this[name] = value
    },
    handleFileChange(event) {
      const [file] = event.target.files
      this.selectedFile = file
    },
    async saveArtwork() {
      const formData = new FormData()
      appendIfNotNull("name", this.name, formData)
      appendIfNotNull("description", this.description, formData)
      appendIfNotNull("categoryId", this.categoryId, formData)
      appendIfNotNull("image", this.selectedFile, formData)
      this.$emit("update", formData)
    },
  },
}
</script>
