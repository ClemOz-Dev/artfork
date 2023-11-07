<template>
  <div :class="{ 'flex flex-col mt-4': isActive }">
    <label :for="name" class="font-bold mb-2">{{ label }}</label>
    <Field
      :name="name"
      as="select"
      :class="{
        'w-80 p-2 border rounded-lg bg-white': isActive,
      }"
    >
      <option value="">{{ defaultValue }}</option>
      <option v-for="option in options" :key="option.id" :value="option.id">
        {{ option.label || option.name || formatFullAddress(option) }}
      </option>
    </Field>
    <ErrorMessage :name="name" class="text-red-500 text-sm w-80" />
  </div>
</template>
<script>
import { Field, ErrorMessage } from "vee-validate"
import AddressMixin from "../../mixins/AddressMixin.js"

export default {
  components: {
    Field,
    ErrorMessage,
  },
  name: "SelectVue",
  mixins: [AddressMixin],
  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: false,
    },
    options: {
      type: Object,
      required: true,
    },
    defaultValue: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isActive: true,
    }
  },
}
</script>
