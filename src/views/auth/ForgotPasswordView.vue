<template>
  <div class="flex flex-col items-center text-black h-full">
    <h1 class="font-bold text-4xl my-14">
      Quelle adresse mail utilisez-vous sur ARTBOOK ?
    </h1>
    <Form
      class="flex flex-col h-full items-center"
      @submit="onSubmit"
      :validation-schema="schema"
    >
      <div class="flex flex-col box-border">
        <InputVue
          label="Votre Email *"
          type="email"
          name="email"
          placeholder="Entrez votre email"
          v-model="schema.email"
        />
        <p class="mt-2 font-bold">
          Vous allez recevoir un lien sur votre adresse mail
        </p>
      </div>
      <div class="mt-10 w-64">
        <button type="submit" class="w-full p-2 bg-primary text-white rounded">
          Recevoir mon lien
        </button>
        <router-link
          :to="{ name: 'login' }"
          class="text-sm text-blue-600 hover:underline text-left"
          >Vous avez déjà un compte ?</router-link
        >
      </div>
    </Form>
  </div>
</template>
<script>
import { Form } from "vee-validate"
import * as yup from "yup"
import InputVue from "../../components/form/input.vue"
import AuthApiService from "../../services/api/AuthApiService.js"

export default {
  name: "TheForgotPasswordPage",
  data() {
    return {
      schema: yup.object({
        email: yup.string().email().required("Veuillez fournir un email."),
      }),
    }
  },
  isLoading: false,
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { Form, InputVue },
  methods: {
    async preparePayload(values) {
      return {
        email: values.email,
      }
    },
    async onSubmit(values) {
      const payload = await this.preparePayload(values)
      try {
        this.isLoading = true
        await AuthApiService.forgotPassword(payload)
        this.$router.push({ name: "home" })
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error.toString())
      }
      this.isLoading = false
    },
  },
}
</script>
