<template>
  <div class="flex flex-col items-center text-black h-full">
    <h1 class="font-bold text-4xl mt-12 mb-6">S'inscrire</h1>
    <Form
      action="#"
      class="flex flex-col h-full items-center space-y-10"
      @submit="onSubmit"
      :validation-schema="schema"
    >
      <div class="sm:flex space-x-4">
        <div class="space-y-4">
          <InputVue
            label="Email *"
            type="email"
            name="email"
            placeholder="Entrez votre email"
            v-model="schema.email"
          />
          <InputVue
            label="Prénom *"
            type="text"
            name="firstName"
            placeholder="Entrez votre prénim"
            v-model="schema.firstName"
          />
          <InputVue
            label="Nom *"
            type="text"
            name="lastName"
            placeholder="Entrez votre nom"
            v-model="schema.lastName"
          />
          <div>
            <span class="font-bold">Sélectionnez votre rôle *</span>
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
          <InputVue
            label="Mot de passe *"
            type="password"
            name="password"
            placeholder="Entrez votre mot de passe"
            v-model="schema.password"
          />
          <InputVue
            label="Confirmer mot de passe"
            type="password"
            name="passwordConfirmation"
            v-model="schema.passwordConfirmation"
            placeholder="Confirmez votre mot de passe"
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
    </Form>
  </div>
</template>

<script>
import * as yup from "yup"
import { Field, Form } from "vee-validate"
import { toast } from "vue3-toastify"
import SpinningLoader from "../../components/UI/SpinningLoader.vue"
import InputVue from "../../components/form/input.vue"
import ReCaptchaV2 from "../../components/form/reCaptchaV2.vue"

export default {
  name: "TheRegisterPage",
  data() {
    return {
      schema: yup.object({
        email: yup.string().email().required("Veuillez fournir un email."),
        firstName: yup
          .string()
          .transform((value) =>
            typeof value === "string" ? value.trim() : value,
          )
          .min(2, "Minimum 2 caractères")
          .required("Veuillez fournir un prénom."),
        lastName: yup
          .string()
          .transform((value) =>
            typeof value === "string" ? value.trim() : value,
          )
          .min(2, "Minimum 2 caractères")
          .required("Veuillez fournir un nom."),
        password: yup
          .string()
          .required("Veuillez fournir un mot de passe.")
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
            "Doit contenir 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.",
          ),
        passwordConfirmation: yup
          .string()
          .required("Merci de confirmer votre mot de passe.")
          .oneOf(
            [yup.ref("password")],
            "Les mots de passe ne correspondent pas",
          ),
      }),
      recaptcha: null,
      selectedRole: "1",
      isLoading: false,
    }
  },
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { ReCaptchaV2, Form, InputVue, Field, SpinningLoader },
  methods: {
    handleRecaptcha(value) {
      this.recaptcha = value
    },
    async preparePayload(values) {
      return {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        roleId: this.selectedRole,
        recaptcha: this.recaptcha,
      }
    },
    async onSubmit(values) {
      const payload = await this.preparePayload(values)
      try {
        this.isLoading = true
        await this.$store.dispatch("authStore/register", payload)
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
