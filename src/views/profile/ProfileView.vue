<template>
  <div class="profile-page">
    <section v-if="userData.email !== null" class="profile-info">
      <form class="profile-form" @submit.prevent="saveProfile">
        <div class="profile-details">
          <h2>Mon Profil</h2>
          <BaseInput
            v-model="userData.email"
            label="Email"
            type="email"
            name="email"
            :errors="errors"
            :value="userData.email"
            @input-changed="inputChange('email', $event)"
          />
          <BaseInput
            label="Prénom"
            type="text"
            name="firstName"
            :errors="errors"
            :value="userData.firstName"
            @input-changed="inputChange('firstName', $event)"
          />
          <BaseInput
            label="Nom"
            type="text"
            name="lastName"
            :errors="errors"
            :value="userData.lastName"
            @input-changed="inputChange('lastName', $event)"
          />
          <BaseInput
            label="Date de naissance"
            type="date"
            name="birthdate"
            :errors="errors"
            :value="userData.birthdate"
            @input-changed="inputChange('birthdate', $event)"
          />
          <BaseInput
            label="Description"
            type="textarea"
            name="description"
            :errors="errors"
            :value="userData.description"
            @input-changed="inputChange('description', $event)"
          />
          <BaseButton :is-disabled="hasNoModifications" type="submit">
            Valider les modifications
          </BaseButton>
        </div>
        <div class="profile-picture">
          <input
            type="file"
            accept="image/*"
            style="display: none"
            ref="imageInput"
            @change="changeProfileImage"
          />
          <img
            :src="userData.image"
            alt="Profil Image"
            @click="openImageInput"
          />
          <button class="edit" @click="openImageInput">Modifier</button>
        </div>
      </form>
    </section>
    <ArtistProfile v-if="isArtist" />

    <GalleristProfile v-if="isGallerist" />
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import UserService from "../../services/business/User"
import AuthApiService from "../../services/api/AuthApiService"

import UserApiService from "../../services/api/UserApiService"
import ArtistProfile from "./artist/ArtistProfile.vue"
import GalleristProfile from "../../components/profile/gallerist-profile/GalleristProfile.vue"
import BaseInput from "../../components/form/BaseInput.vue"
import BaseButton from "../../components/form/BaseButton.vue"

export default {
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { BaseButton, GalleristProfile, ArtistProfile, BaseInput },
  data() {
    return {
      userData: {
        email: null,
        firstName: null,
        lastName: null,
        birthdate: null,
        description: null,
        image: "public/img/artist.png",
      },
      initialData: null,
      errors: {},
    }
  },
  async beforeMount() {
    await AuthApiService.fetchCurrentUser()
    this.assignCurrentUserValues()
  },
  computed: {
    ...mapGetters("userStore", ["currentUser"]),

    isArtist() {
      if (this.currentUser) {
        return UserService.isArtist(this.currentUser)
      }
      return false
    },
    isGallerist() {
      if (this.currentUser) {
        return UserService.isGallerist(this.currentUser)
      }
      return false
    },
    hasNoModifications() {
      return JSON.stringify(this.userData) === JSON.stringify(this.initialData)
    },
  },

  methods: {
    inputChange(name, value) {
      this.userData[name] = value
    },
    assignCurrentUserValues() {
      if (this.currentUser) {
        this.userData.email = this.currentUser.email
        this.userData.firstName = this.currentUser.firstName
        this.userData.lastName = this.currentUser.lastName
        this.userData.birthdate = this.currentUser.birthdate
        this.userData.description = this.currentUser.description
      }
      this.initialData = { ...this.userData }
    },
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
    async saveProfile() {
      try {
        await UserApiService.updateUser(this.currentUser.id, this.userData)
        this.initialData = { ...this.userData }
      } catch (e) {
        console.error(e.toString())
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.profile-page .profile-info h2 {
  font-weight: 700;
  font-size: 64px;
  width: 100%;
}

.profile-page .profile-info,
.profile-page {
  padding: 50px;
}

.profile-page .profile-info .profile-form {
  display: flex;
  flex-wrap: wrap;
}

.profile-page .profile-info .profile-form .profile-details {
  width: 70%;
  display: flex;
  flex-wrap: wrap;
  // flex-direction: column;
  padding: 20px;
  height: 100%;
  justify-content: space-between;
  align-content: flex-start;
  order: initial;
}

.profile-page .profile-info .profile-form .profile-details .email,
.profile-page .profile-info .profile-form .profile-details .password,
.profile-page .profile-info .profile-form .profile-details .name,
.profile-page .profile-info .profile-form .profile-details .birthdate,
.profile-page .profile-info .profile-form .profile-details .presentation,
.profile-page .add-artwork .add-artwork-form .artwork-name,
.profile-page .add-artwork .add-artwork-form .category,
.profile-page .add-artwork .add-artwork-form .description {
  width: 45%;
  display: flex;
  flex-direction: column;
  margin-right: 25px;
  margin-bottom: 20px;
}

.profile-page .profile-info .profile-form .profile-details .description {
  margin-left: calc(45% + 50px);
}

.profile-page .profile-info .profile-form .profile-details .email input,
.profile-page .profile-info .profile-form .profile-details .password input,
.profile-page .profile-info .profile-form .profile-details .name input,
.profile-page .profile-info .profile-form .profile-details .birthdate input,
.profile-page .add-artwork .add-artwork-form .artwork-name input,
.profile-page .add-artwork .add-artwork-form .category input {
  border: 1px solid black;
  border-radius: 6.7px;
  height: 42px;
  padding: 10px;
}

.profile-page
  .profile-info
  .profile-form
  .profile-details
  .presentation
  textarea {
  border: 1px solid black;
  border-radius: 6.7px;
  height: 105px;
  padding: 10px;
}

.profile-page .profile-info .profile-form .profile-picture {
  width: 30%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  order: initial;
}

.profile-page .profile-info .profile-form .profile-picture button {
  width: auto;
  top: 0;
  margin: 5px;
  padding: 10px;
}

.profile-page .profile-info .profile-form .profile-picture img {
  height: 452px;
}

.profile-form button {
  background: #ef4444;
  // position: relative;
  margin-top: 20px;

  height: 40px;
  color: white;
  font-weight: 700;
  width: 315px;
  border-radius: 6.7px;
  order: initial;
}

.add-artwork h3 {
  font-size: 32px;
  font-weight: 700;
}

.add-artwork button {
  background: #ef4444;
  height: 40px;
  color: white;
  font-weight: 700;
  width: 315px;
  border-radius: 6.7px;
}

.profile-page .add-artwork .add-artwork-form .artwork-name,
.profile-page .add-artwork .add-artwork-form .category,
.profile-page .add-artwork .add-artwork-form .description {
  margin-top: 10px;
  margin-bottom: 10px;
}

.profile-page .add-artwork .add-artwork-form .description textarea {
  border: 1px solid black;
  border-radius: 6.7px;
  height: 164px;
  padding: 10px;
}

/*Média-queries*/
@media all and (max-width: 768px) {
  .profile-page .profile-info h2 {
    font-size: 32px;
    text-align: center;
    position: absolute;
    top: 90px;
    left: 0;
  }

  .profile-page .profile-info,
  .profile-page .add-artwork {
    padding: 0;
  }

  .profile-page .profile-info .profile-form .profile-details {
    width: 100%;
    padding: 20px;
    order: 2;
  }

  .profile-page .profile-info .profile-form .profile-details .email,
  .profile-page .profile-info .profile-form .profile-details .password,
  .profile-page .profile-info .profile-form .profile-details .name,
  .profile-page .profile-info .profile-form .profile-details .birthdate,
  .profile-page .profile-info .profile-form .profile-details .presentation,
  .profile-page .add-artwork .add-artwork-form .artwork-name,
  .profile-page .add-artwork .add-artwork-form .category,
  .profile-page .add-artwork .add-artwork-form .description {
    width: 100%;
    margin-right: 0;
  }

  .profile-page .profile-info .profile-form .profile-details .presentation {
    margin-left: 0;
  }

  .profile-page .profile-info .profile-form .profile-picture {
    width: 100%;
    order: 1;
    margin-top: 20%;
  }

  .profile-page .profile-info .profile-form .profile-picture button {
    width: auto;
    top: 0;
    margin: 5px;
    padding: 10px;
  }

  .profile-page .profile-info .profile-form .profile-picture img {
    height: 227px;
  }

  .profile-form button {
    top: 0;
    left: 0;
    order: 3;
    width: 100%;
  }

  .profile-page .add-artwork {
    margin-top: 40px;
  }

  .add-artwork h3 {
    font-size: 28px;
    text-align: center;
  }

  .add-artwork .file-mobile {
    width: 100%;
  }

  .add-artwork button {
    width: 100%;
  }

  .add-artwork-form {
    width: 100%;
  }
}
</style>
