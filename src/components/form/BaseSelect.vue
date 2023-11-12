<template>
  <div :class="{ 'flex flex-col mt-4': isActive }">
    <label :for="name" class="font-bold mb-2">{{ label }}</label>
    <Field
      :name="name"
      as="select"
      :class="{
        'w-80 p-2 border rounded-lg bg-white': isActive,
        'on-error': isOnError,
      }"
      @change="onSelectChange"
    >
      <option value="">{{ defaultValue }}</option>
      <option v-for="option in options" :key="option.id" :value="option.id">
        {{ option.label || option.name || formatFullAddress(option) }}
      </option>
    </Field>
    <div class="error-message" v-if="isOnError">
      {{ errors[name] }}
    </div>
  </div>
</template>
<script>
import { Field } from "vee-validate"
import AddressMixin from "../../mixins/AddressMixin"

export default {
  components: {
    Field,
  },
  name: "BaseSelect",
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
    errors: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isActive: true,
    }
  },
  computed: {
    isOnError() {
      return this.errors === undefined
        ? false
        : this.errors[this.name] !== undefined
    },
  },
  methods: {
    onSelectChange(event) {
      const selectedOption = event.target.value
      this.$emit("option-selected", selectedOption)
    },
  },
}
</script>
<style lang="scss" scoped>
.error-message {
  color: #ef4444;
  font-size: 12px;
  font-style: italic;
}

.on-error {
  border-color: #ef4444;
}
</style>
