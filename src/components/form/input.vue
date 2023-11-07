<template>
  <div :class="{ 'flex flex-col mt-4': isActive, 'mt-0': hasCaptcha }">
    <label :for="name" class="font-bold mb-2">{{ label }}</label>
    <Field
      :type="type"
      :name="name"
      :class="{
        'w-80 p-2 border rounded-lg bg-white': isActive,
        'w-32': hasCaptcha,
      }"
      :placeholder="placeholder"
      :value="defaultValue"
    />
    <ErrorMessage :name="name" class="text-red-500 text-sm w-80" />
  </div>
</template>
<script>
import { Field, ErrorMessage } from "vee-validate"

export default {
  components: {
    Field,
    ErrorMessage,
  },
  name: "InputVue",
  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
    },
    hasCaptcha: {
      type: Boolean,
      default: false,
    },
    defaultValue: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isActive: true,
    }
  },
}
</script>
