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
        <BaseInput label="Nom" type="text" name="name" placeholder="" />
        <BaseInput label="Description" type="text" name="description" />
        <BaseInput
          label="Date de début de l\'exposition"
          type="date"
          name="startDate"
        />
        <BaseInput
          label="Date de fin de l\'exposition"
          type="date"
          name="endDate"
        />
        <BaseSelect
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
import MultiSelect from "../../../../form/MultiSelect.vue"
import BaseInput from "../../../../form/BaseInput.vue"
import ExhibitionApiService from "../../../../../services/api/ExhibitionApiService"
import ArtWorkApiService from "../../../../../services/api/ArtworkApiService"
import BaseSelect from "../../../../form/BaseSelect.vue"

export default {
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { BaseSelect, BaseInput, Form, MultiSelect },
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
    ...mapGetters("userStore", ["currentUser", "myGalleries"]),
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
<style scoped lang="scss">
.add-gallery {
  padding: 50px;
}

.add-gallery button {
  background: #ef4444;
  height: 40px;
  color: white;
  font-weight: 700;
  width: 315px;
  border-radius: 6.7px;
  margin-top: 2rem;
}

.add-gallery-form {
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
  .add-gallery {
    padding: 0;
    margin-top: 40px;
  }

  .add-gallery button {
    width: 100%;
  }

  .add-gallery-form {
    width: 100%;
  }
}
</style>
