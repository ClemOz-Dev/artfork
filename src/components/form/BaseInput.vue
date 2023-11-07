<template>
  <div :class="{ 'flex flex-col mt-4': isActive }">
    <label :for="name" class="font-bold mb-2"
      >{{ label }}
      <span v-if="isMandatory">*</span>
    </label>
    <input
      :id="name"
      :name="name"
      :value="value"
      :disabled="isDisabled"
      :type="type"
      :class="{
        'w-80 p-2 border rounded-lg bg-white': isActive,
        'w-80 disabled': isDisabled,
        'on-error': isOnError,
      }"
      :placeholder="placeholder"
      :accept="acceptedTypes"
      :autocomplete="type !== 'password'"
      @input="updateValue"
    />
    <div class="error-message" v-if="isOnError">
      {{ errors[name] }}
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseInput",
  props: {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      required: false,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    isMandatory: {
      type: Boolean,
      default: false,
    },
    errors: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isActive: true,
      inputValue: this.value,
    }
  },
  computed: {
    acceptedTypes() {
      return this.type === "file" ? "image/*" : "*/*"
    },
    isOnError() {
      return this.errors === undefined
        ? false
        : this.errors[this.name] !== undefined
    },
  },
  methods: {
    updateValue(event) {
      this.inputValue = event.target.value
      this.$emit("input-changed", this.inputValue)
    },
  },
}
</script>

<style scoped>
span {
  color: #ef4444;
}
.disabled {
  background-color: lightgrey;
  opacity: 0.8;
  color: grey;
}

.error-message {
  color: #ef4444;
  font-size: 12px;
  font-style: italic;
}

.on-error {
  border-color: #ef4444;
}
</style>
