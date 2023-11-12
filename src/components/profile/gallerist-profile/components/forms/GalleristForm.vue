<template>
  <section>
    <form @submit.prevent="saveGallery" ref="form">
      <div class="in-row">
        <BaseInput
            :value="description"
            type="text"
            name="description"
            label="Description"
            :errors="formErrors"
            class="mr-2"
            @input-changed="inputChange('description', $event)"
        />
        <BaseInput
            label="Image de l'Œuvre"
            type="file"
            name="image"
            :errors="formErrors"
            @change="handleFileChange"
        />
      </div>

      <div class="in-row">
        <BaseInput
            :value="road"
            type="text"
            name="road"
            label="Voie"
            :errors="formErrors"
            class="mr-2"
            @input-changed="inputChange('road', $event)"
        />
        <BaseInput
            :value="country"
            type="text"
            name="country"
            label="Pays"
            :errors="formErrors"
            class="mr-2"
            @input-changed="inputChange('country', $event)"
        />

      </div>
      <div class="in-row">
        <div>
          <BaseInput
              label="Code postal"
              type="number"
              name="zipcode"
              :errors="formErrors"
              @input="onZipCodeChange"
          />
          <LocalitiesList
              :select-result="selectLocality"
              :localities="localities"
          />
        </div>

        <BaseInput
            :value="city"
            name="city"
            label="Ville"
            :errors="formErrors"
            :is-disabled="true"
        />
      </div>


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
import BaseInput from "@/components/form/BaseInput.vue"
import LocalitiesList from "@/components/form/LocalitiesList.vue"
import LocalisationService from "@/services/business/Localisation"
import appendIfNotNull from "@/utils/form.js";
import {mapGetters} from "vuex";

export default {
  components: {LocalitiesList, BaseInput},
  data() {
    return {
      description: null,
      image: null,
      road: null,
      zipcode: null,
      country: null,
      city: "France",
      localities: [],
    }
  },
  computed: {
    ...mapGetters("galleristStore", ["formErrors"]),
  },
  methods: {
    closeModal() {
      this.$emit("close-modal")
    },
    inputChange(name, value) {
      this[name] = value
    },
    handleFileChange(event) {
      const [file] = event.target.files
      this.image = file
    },
    async saveGallery() {
      const formData = new FormData()
      appendIfNotNull("description", this.description, formData)
      appendIfNotNull("image", this.image, formData)
      appendIfNotNull("road", this.road, formData)
      appendIfNotNull("zipcode", this.zipcode, formData)
      appendIfNotNull("city", this.city, formData)
      appendIfNotNull("country", this.country, formData)
      this.$emit("update", formData)
    },
    async onZipCodeChange(event) {
      const {value} = event.target
      this.inputChange("zipcode", value)

      if (value.length < 5) {
        this.city = null
        this.localities = []
      } else {
        this.localities = await LocalisationService.fetchLocalities(value)
      }
    },
    selectLocality(locality) {
      this.city = locality.nomCommune
      this.localities = []
    },
  },
}
</script>
<style lang="scss" scoped>
.in-row {
  display: flex;
}

</style>
