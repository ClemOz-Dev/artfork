<template>
  <section class="add-artwork">
    <h3>Ajouter une exposition</h3>
    <Form
      @submit="saveExhibition"
      :validation-schema="schema"
      ref="form"
      class="flex flex-col md:flex-row"
    >
      <div>
        <InputVue label="Nom" type="text" name="name" placeholder="" />
        <InputVue
          label="Description"
          type="text"
          name="description"
          placeholder=""
        />
        <InputVue
          label="Date de début de l\'exposition"
          type="date"
          name="startDate"
          placeholder=""
        />
        <InputVue
          label="Date de fin de l\'exposition"
          type="date"
          name="endDate"
          placeholder=""
        />
        <SelectVue
          default-value=""
          :options="myGalleries"
          name="gallery_id"
          label="Galeries"
        />
        <MultiSelect :options="artworksData" />
      </div>
      <div class="ml-2 md:grid md:place-self-end">
        <button type="submit">Enregistrer une exposition</button>
      </div>
    </Form>
  </section>
</template>

<script>
import * as yup from "yup"
import { Form } from "vee-validate"
import { mapGetters } from "vuex"
import InputVue from "../../../../form/input.vue"
import MultiSelect from "../../../../form/MultiSelect.vue"
import ExhibitionApiService from "../../../../../services/api/ExhibitionApiService.js"
import ArtWorkApiService from "../../../../../services/api/ArtworkApiService.js"
import SelectVue from "../../../../form/select.vue"

export default {
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { SelectVue, InputVue, Form, MultiSelect },
  data() {
    return {
      schema: yup.object({
        name: yup.string().required("Veuillez fournir un nom."),
        description: yup.string().required("Veuillez fournir une description."),
        startDate: yup.string().required("Veuillez fournir une date de début."),
        endDate: yup.string().required("Veuillez fournir une date de fin."),
        artworks: yup.array().of(yup.object()),
        gallery_id: yup.string().required("Veuillez choisir une galerie."),
      }),
      artworksData: [],
    }
  },
  async beforeMount() {
    await this.fetchArtworks()
  },
  computed: {
    ...mapGetters("userStore", ["getMe", "myGalleries"]),
  },
  methods: {
    async fetchArtworks() {
      const artworksInExhibition =
        await ArtWorkApiService.getArtworksInExhibition()
      const artworksOutExhibition = artworksInExhibition.filter(
        (artwork) => artwork.exhibitions.length === 0,
      )
      this.artworksData = artworksOutExhibition
    },
    async saveExhibition(schema) {
      const artworkIds = schema.artworks.map((artwork) => artwork.id)
      schema.artworks.map((artwork) => delete artwork.exhibitions)
      const newData = {
        ...schema,
        artworks: artworkIds,
      }
      try {
        await ExhibitionApiService.createExhibition(newData)
        this.$refs.form.resetForm()
      } catch (e) {
        console.error(e.toString())
      }
      await this.$emit("update")
    },
  },
}
</script>
<style scoped lang="scss" src="../../GalleryProfile.scss" />
