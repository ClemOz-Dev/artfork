<template>
  <section class="add-artwork">
    <h3 class="text-2xl font-extrabold underline">Ajouter une Œuvre:</h3>
    <Form
      class="add-artwork-form"
      @submit="saveArtwork"
      :validation-schema="schema"
      ref="form"
    >
      <InputVue
        label="Nom de l'Œuvre"
        type="text"
        name="name"
        placeholder=""
        class="mr-2"
      />
      <BaseInput
        label="Image de l'Œuvre"
        type="file"
        name="image"
        @change="handleFileChange"
      />
      <InputVue
        label="Description de l'Œuvre"
        type="text"
        name="description"
        placeholder=""
        class="mr-2"
      />
      <SelectVue
        label="Catégorie de l'Œuvre"
        default-value="Sélectionnez une catégorie"
        :options="categories"
        name="categoryId"
      />

      <button type="submit">Enregistrer une Œuvre</button>
    </Form>
  </section>
</template>
<script>
import * as yup from "yup"
import { Form } from "vee-validate"
import { toast } from "vue3-toastify"
import SelectVue from "../../../../form/select.vue"
import InputVue from "../../../../form/input.vue"
import ArtworkApiService from "../../../../../services/api/ArtworkApiService.js"
import BaseInput from "../../../../form/BaseInput.vue"

export default {
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { BaseInput, InputVue, SelectVue, Form },
  data() {
    return {
      schema: yup.object({
        name: yup.string().required("Veuillez fournir un nom."),
        description: yup.string().required("Veuillez fournir une description."),
        categoryId: yup
          .string()
          .required("Veuillez sélectionner une catégorie."),
      }),
      selectedFile: null,
    }
  },
  computed: {
    categories() {
      return this.$store.state.categoryStore.categories
    },
  },

  async beforeMount() {
    this.categories = await this.$store.dispatch(
      "categoryStore/fetchCategories",
    )
  },
  methods: {
    handleFileChange(event) {
      // eslint-disable-next-line prefer-destructuring
      this.selectedFile = event.target.files[0]
    },
    async saveArtwork(schema) {
      const formData = new FormData() // Créez une instance de FormData

      formData.append("name", schema.name)
      formData.append("description", schema.description)
      formData.append("categoryId", schema.categoryId)
      formData.append("image", this.selectedFile)

      try {
        await ArtworkApiService.createArtwork(formData)
        toast.success("L'oeuvre a été créée avec succès.")

        this.$refs.form.resetForm()
      } catch (e) {
        toast.error("Erreur lors de la création de l'oeuvre.")
      }
      this.$emit("update")
    },
  },
}
</script>
