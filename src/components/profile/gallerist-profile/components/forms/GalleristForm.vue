<template>
  <section class="add-gallery">
    <h3>Ajouter une gallerie</h3>
    <Form class="add-gallery-form" @submit="saveGallery" ref="form">
      <BaseInput
        label="Description"
        type="text"
        name="description"
        placeholder=""
      />
      <BaseInput label="Image" type="text" name="image" placeholder="" />
      <BaseInput label="Voie" type="text" name="road" placeholder="" />
      <BaseInput
        label="Code postal"
        type="text"
        name="zipcode"
        @input="onZipCodeChange"
      />
      <LocalitiesList
        :select-result="selectLocality"
        :localities="localities"
      />
      <BaseInput
        v-model:value="selectedCity"
        name="city"
        label="Ville"
        :is-disabled="true"
      />
      <BaseInput label="Pays" type="text" name="country" />
      <button type="submit">Enregistrer une galerie</button>
    </Form>
  </section>
</template>

<script>
import * as yup from "yup"
import { Form } from "vee-validate"
import BaseInput from "../../../../form/BaseInput.vue"
import LocalitiesList from "../../../../form/LocalitiesList.vue"
import GalleryApiService from "../../../../../services/api/GalleryApiService"
import LocalisationService from "../../../../../services/business/Localisation"

export default {
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { LocalitiesList, BaseInput, Form },
  data() {
    return {
      schema: yup.object({
        description: yup.string().required("Veuillez fournir une description."),
        image: yup.string().required("Veuillez fournir une image."),
        road: yup.string().required("Veuillez fournir une voie."),
        zipcode: yup.string().required("Veuillez fournir un code postal."),
        country: yup
          .string()
          .required("Veuillez fournir un pays.")
          .default("France"),
      }),
      localities: [],
      selectedCity: null,
    }
  },
  methods: {
    async saveGallery(schema) {
      const payload = { city: this.selectedCity, ...schema }
      try {
        await GalleryApiService.createGallery(payload)
        this.$refs.form.resetForm()
      } catch (e) {
        console.error(e.toString())
      }
      await this.$emit("update")
    },

    async onZipCodeChange(event) {
      const { value } = event.target

      if (value.length < 5) {
        this.selectedCity = null
        this.localities = []
      } else {
        this.localities = await LocalisationService.fetchLocalities(value)
      }
    },
    selectLocality(locality) {
      this.selectedCity = locality.nomCommune
      this.localities = []
    },
  },
}
</script>
