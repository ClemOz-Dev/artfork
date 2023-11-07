<template>
  <div class="recaptcha__wrapper">
    <vue-recaptcha
      ref="recaptcha"
      :class="isInputIncorrect ? 'recaptcha recaptcha__error' : 'recaptcha'"
      :sitekey="recaptchaSiteKey"
      @verify="onCaptchaVerified"
    />
    <p v-if="errorInputMessage !== null" class="input__error">
      {{ errorInputMessage }}
    </p>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { VueRecaptcha } from "vue-recaptcha"

export default {
  name: "ReCaptchaV2",
  components: {
    VueRecaptcha,
  },
  props: {
    name: {
      type: String,
    },
    errorMessage: {
      type: [String, Object],
    },
  },
  data() {
    return {
      recaptchaSiteKey: "6LfZVZIoAAAAAAC7tNlItMbqVN7fsN-lccSRYBJP",
    }
  },
  computed: {
    isInputIncorrect() {
      return !!(this.errorMessage && this.errorMessage[this.name])
    },
    errorInputMessage() {
      if (this.isInputIncorrect) {
        this.$refs.recaptcha.reset()
        return this.errorMessage[this.name]
      }
      return null
    },
  },
  methods: {
    onCaptchaVerified(token) {
      this.$emit("recaptcha-value-change", token)
    },
  },
}
</script>

<style lang="scss">
.recaptcha {
  div {
    margin: auto;
  }
}
</style>

<style lang="scss" scoped>
.recaptcha__wrapper {
  margin: 16px 0;

  .input__error {
    text-align: center;
  }
}
</style>
