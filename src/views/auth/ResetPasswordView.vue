<template>
  <div class="flex flex-col items-center text-black h-full">
    <h1 class="font-bold text-4xl my-14">
      Veuillez saisir votre nouveau mot de passe
    </h1>
    <Form
      action="#"
      class="flex flex-col h-full items-center"
      @submit="onSubmit"
      :validation-schema="schema"
    >
      <div class="space-y-4">
        <BaseInput
          label="Mot de passe *"
          type="password"
          name="password"
          placeholder="Entrez votre mot de passe"
          v-model="schema.password"
        />
        <BaseInput
          label="Confirmer mot de passe"
          type="password"
          name="passwordConfirmation"
          v-model="schema.passwordConfirmation"
          placeholder="Confirmez votre mot de passe"
        />
      </div>
      <div class="mt-10 w-64">
        <button type="submit" class="w-full p-2 bg-primary text-white rounded">
          Réinitialiser mon mot de passe
        </button>
      </div>
    </Form>
  </div>
</template>
<script>
import { Form } from "vee-validate"
import * as yup from "yup"
import AuthApiService from "../../services/api/AuthApiService"
import BaseInput from "../../components/form/BaseInput.vue"

export default {
  name: "TheResetPasswordPage",
  data() {
    return {
      schema: yup.object({
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
    }
  },
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { BaseInput, Form },
  isLoading: false,
  methods: {
    async preparePayload(values) {
      return {
        password: values.password,
      }
    },
    async onSubmit(values) {
      const payload = await this.preparePayload(values)
      const resetToken = this.$route.query.token
      try {
        this.isLoading = true
        await AuthApiService.resetPassword(payload, resetToken)
        this.$router.push({ name: "login" })
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error.toString())
      }
      this.isLoading = false
    },
  },
}
</script>
