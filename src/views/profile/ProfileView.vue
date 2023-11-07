<template>
  <div class="profile-page">
    <section v-if="getMe" class="profile-info">
      <Form
        class="profile-form"
        @submit="saveProfile"
        :validation-schema="schema"
      >
        <div class="profile-details">
          <h2>Mon Profil</h2>
          <InputVue
            label="Email"
            type="email"
            name="email"
            :default-value="getMe.email"
          />

          <InputVue
            label="Prénom"
            type="text"
            name="firstName"
            :default-value="getMe.firstName"
          />
          <InputVue
            label="Nom"
            type="text"
            name="lastName"
            :default-value="getMe.lastName"
          />
          <InputVue
            label="Date de naissance"
            type="date"
            name="birthdate"
            :default-value="getMe.birthdate"
          />
          <InputVue
            label="Description"
            type="textarea"
            name="description"
            :default-value="getMe.description"
          />
          <button type="submit">Valider les modifications</button>
        </div>
        <div class="profile-picture">
          <input
            type="file"
            accept="image/*"
            style="display: none"
            ref="imageInput"
            @change="changeProfileImage"
          />
          <img :src="profileImage" alt="Profil Image" @click="openImageInput" />
          <button class="edit" @click="openImageInput">Modifier</button>
        </div>
      </Form>
    </section>

    <ArtistProfile v-if="isArtist" />

    <GalleristProfile v-if="isGallerist" />
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import * as yup from "yup"
import { Form } from "vee-validate"
import UserService from "../../services/business/User.js"
import AuthApiService from "../../services/api/AuthApiService.js"
import InputVue from "../../components/form/input.vue"
import UserApiService from "../../services/api/UserApiService.js"
import ArtistProfile from "../../components/profile/artist-profile/ArtistProfile.vue"
import GalleristProfile from "../../components/profile/gallerist-profile/GalleristProfile.vue"

export default {
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { GalleristProfile, ArtistProfile, InputVue, Form },
  data() {
    return {
      schema: yup.object({
        email: yup.string().email(),
        firstName: yup
          .string()
          .transform((value) =>
            typeof value === "string" ? value.trim() : value,
          )
          .min(2, "Minimum 2 caractères"),
        lastName: yup
          .string()
          .transform((value) =>
            typeof value === "string" ? value.trim() : value,
          )
          .min(2, "Minimum 2 caractères"),
        description: yup
          .string()
          .transform((value) =>
            typeof value === "string" ? value.trim() : value,
          ),
      }),
      profileImage: "public/img/artist.png",
      myArtworks: [],
    }
  },
  async beforeMount() {
    await AuthApiService.fetchCurrentUser()
  },
  computed: {
    ...mapGetters("userStore", ["getMe"]),
    isArtist() {
      if (this.getMe) {
        return UserService.isArtist(this.getMe)
      }
      return false
    },
    isGallerist() {
      if (this.getMe) {
        return UserService.isGallerist(this.getMe)
      }
      return false
    },
  },

  methods: {
    openImageInput() {
      this.$refs.imageInput.click()
    },

    changeProfileImage(event) {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.profileImage = e.target.result
        }
        reader.readAsDataURL(file)
      }
    },
    async saveProfile(schema) {
      try {
        await UserApiService.updateUser(this.getMe.id, schema)
      } catch (e) {
        console.error(e.toString())
      }
    },
  },
}
</script>

<style scoped lang="scss" src="ProfilView.scss" />
