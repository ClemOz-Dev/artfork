<template>
  <div class="flex flex-col items-center text-black h-full">
    <h1 class="font-bold text-4xl mt-12 mb-6">S'inscrire</h1>
    <form
      class="flex flex-col h-full items-center space-y-10"
      @submit.prevent="onSubmit"
    >
      <div class="sm:flex space-x-4">
        <div class="space-y-4">
          <BaseInput
            :value="email"
            label="Email"
            type="email"
            name="email"
            :is-mandatory="true"
            placeholder="Entrez votre email"
            :error="errors"
            @input-changed="inputChange('email', $event)"
          />
          <BaseInput
            :value="firstName"
            label="Prénom"
            type="text"
            name="firstName"
            :is-mandatory="true"
            placeholder="Entrez votre prénom"
            @input-changed="inputChange('firstName', $event)"
          />
          <BaseInput
            :value="lastName"
            label="Nom"
            type="text"
            name="lastName"
            :is-mandatory="true"
            placeholder="Entrez votre nom"
            :error="errors"
            @input-changed="inputChange('lastName', $event)"
          />
          <div>
            <span class="font-bold">Sélectionnez votre rôle</span>
            <div class="flex items-center gap-2 ml-2 mt-2">
              <Field
                id="3"
                type="radio"
                name="type"
                value="3"
                class="appearance-none p-2 bg-white rounded-full border-2 checked:bg-blue-500"
                v-model="selectedRole"
              />
              <label for="artiste">Artiste</label>
            </div>
            <div class="flex items-center gap-2 ml-2">
              <Field
                id="2"
                type="radio"
                name="type"
                value="2"
                class="appearance-none p-2 bg-white rounded-full border-2 checked:bg-blue-500"
                v-model="selectedRole"
              />
              <label for="galeriste">Galeriste</label>
            </div>
            <div class="flex items-center gap-2 ml-2">
              <Field
                id="1"
                type="radio"
                name="type"
                value="1"
                class="appearance-none p-2 bg-white rounded-full border-2 checked:bg-blue-500"
                v-model="selectedRole"
              />
              <label for="collectionneur">Collectionneur</label>
            </div>
          </div>
        </div>
        <div class="space-y-4">
          <BaseInput
            :value="password"
            label="Mot de passe"
            type="password"
            name="password"
            :is-mandatory="true"
            placeholder="Entrez votre mot de passe"
            :error="errors"
            @input-changed="inputChange('password', $event)"
          />
          <BaseInput
            :value="passwordConfirm"
            label="Confirmer mot de passe"
            type="password"
            name="passwordConfirm"
            :is-mandatory="true"
            placeholder="Confirmez votre mot de passe"
            :error="errors"
            @input-changed="inputChange('passwordConfirm', $event)"
          />
        </div>
      </div>
      <ReCaptchaV2
        name="recaptcha"
        @recaptcha-value-change="handleRecaptcha($event)"
      />
      <div class="w-80">
        <SpinningLoader v-if="isLoading" />
        <button
          v-else
          type="submit"
          class="w-full p-2 bg-primary text-white rounded"
        >
          S'inscrire
        </button>
        <p class="mt-4 text-center">Vous avez déjà un compte?</p>
        <router-link :to="{ name: 'login' }">
          <button
            type="button"
            class="w-full p-2 border border-primary text-primary rounded"
          >
            Se connecter
          </button>
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { Field } from "vee-validate"
import { toast } from "vue3-toastify"
import SpinningLoader from "../../components/UI/SpinningLoader.vue"
import ReCaptchaV2 from "../../components/form/reCaptchaV2.vue"
import BaseInput from "../../components/form/BaseInput.vue"

export default {
  name: "TheRegisterPage",
  components: { BaseInput, ReCaptchaV2, SpinningLoader, Field },
  data() {
    return {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      passwordConfirm: "",
      recaptcha: null,
      selectedRole: "1",
      isLoading: false,
      errors: {},
    }
  },
  methods: {
    inputChange(name, value) {
      this[name] = value
    },
    handleRecaptcha(value) {
      this.recaptcha = value
    },
    async preparePayload() {
      return {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        roleId: this.selectedRole,
        recaptcha: this.recaptcha,
      }
    },
    async onSubmit() {
      if (this.password !== this.passwordConfirm) {
        this.errors = {
          passwordConfirm: "Doit correspondre au mot de passe",
        }
        return
      }
      const payload = await this.preparePayload(this)
      try {
        this.isLoading = true
        await this.$store.dispatch("authStore/register", payload)
        this.$router.push({ name: "home" })
      } catch (e) {
        if (e.status === 422) {
          this.errors = e.data
        } else {
          toast.error(e.data.error, {
            autoClose: 1000,
          })
        }
      }
      this.isLoading = false
    },
  },
}
</script>
