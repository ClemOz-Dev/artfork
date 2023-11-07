<template>
  <div class="flex flex-col items-center text-black h-full">
    <h1 class="font-bold text-4xl my-14">Connexion</h1>
    <form class="flex flex-col h-full items-center" @submit.prevent="onSubmit">
      <BaseInput
        :value="email"
        label="Email"
        type="email"
        name="email"
        :is-mandatory="true"
        placeholder="Entrez votre email"
        :errors="errors"
        @input-changed="inputChange('email', $event)"
      />

      <BaseInput
        :value="password"
        label="Mot de passe"
        type="password"
        name="password"
        :is-mandatory="true"
        placeholder="Entrez votre mot de passe"
        :errors="errors"
        @input-changed="inputChange('password', $event)"
      />
      <router-link
        :to="{ name: 'forgot-password' }"
        class="text-sm text-blue-600 hover:underline text-left mt-4"
        >Mot de passe oublié?
      </router-link>

      <div class="mt-10 w-64">
        <SpinningLoader v-if="isLoading" />
        <button
          v-else
          type="submit"
          class="w-full p-2 bg-primary text-white rounded"
        >
          Connexion
        </button>
        <p class="mt-4 text-center">Pas encore de compte?</p>
        <router-link :to="{ name: 'register' }">
          <button
            type="button"
            class="w-full p-2 border border-primary text-primary rounded mt-2"
          >
            Créer un compte
          </button>
        </router-link>
      </div>
    </form>
  </div>
</template>
<script>
import { toast } from "vue3-toastify"
import SpinningLoader from "../../components/UI/SpinningLoader.vue"
import BaseInput from "../../components/form/BaseInput.vue"

export default {
  name: "Connexion",
  data() {
    return {
      email: "",
      password: "",
      isLoading: false,
      errors: {},
    }
  },
  components: { BaseInput, SpinningLoader },
  methods: {
    async onSubmit() {
      const { email, password } = this
      try {
        this.isLoading = true
        this.errors = {}
        await this.$store.dispatch("authStore/login", { email, password })
        this.$router.push({ name: "home" })
      } catch (e) {
        this.errors = { email: "", password: "" }
        toast.error("La connexion a échoué", {
          autoClose: 1500,
        })
      }
      this.isLoading = false
    },
    inputChange(name, value) {
      this.errors = {}
      this[name] = value
    },
  },
}
</script>
