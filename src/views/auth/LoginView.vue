<template>
  <div class="flex flex-col items-center text-black h-full">
    <h1 class="font-bold text-4xl my-14">Connexion</h1>
    <Form
      class="flex flex-col h-full items-center"
      @submit="onSubmit"
      :validation-schema="schema"
    >
      <InputVue
        label="Email *"
        type="email"
        name="email"
        placeholder="Entrez votre email"
      />
      <div>
        <InputVue
          label="Mot de passe *"
          type="password"
          name="password"
          placeholder="Entrez votre mot de passe"
        />
        <router-link
          :to="{ name: 'forgot-password' }"
          class="text-sm text-blue-600 hover:underline text-left"
          >Mot de passe oublié?
        </router-link>
      </div>
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
    </Form>
  </div>
</template>
<script>
import * as yup from "yup"
import { Form } from "vee-validate"
import { toast } from "vue3-toastify"
import SpinningLoader from "../../components/UI/SpinningLoader.vue"
import InputVue from "../../components/form/input.vue"

export default {
  name: "Connexion",
  data() {
    return {
      schema: yup.object({
        email: yup.string().email().required("Veuillez fournir un email."),
        password: yup.string().required("Veuillez fournir un mot de passe."),
      }),
      isLoading: false,
    }
  },
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { InputVue, SpinningLoader, Form },
  methods: {
    async onSubmit(values) {
      try {
        this.isLoading = true
        await this.$store.dispatch("authStore/login", values)
        this.$router.push({ name: "home" })
      } catch (e) {
        toast.error(e.error, {
          autoClose: 1000,
        })
      }
      this.isLoading = false
    },
  },
}
</script>
