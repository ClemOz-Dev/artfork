<template>
  <div :class="{ 'flex flex-col mt-4': isActive }">
    <label :for="name" class="font-bold mb-2">{{ label }}</label>
    <input
      :id="name"
      :name="name"
      :value="value"
      :disabled="isDisabled"
      :type="type"
      :class="{
        'w-80 p-2 border rounded-lg bg-white': isActive,
        'w-80 disabled': isDisabled,
      }"
      :placeholder="placeholder"
      :accept="acceptedTypes"
    />
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
  },
  data() {
    return {
      isActive: true,
    }
  },
  computed: {
    acceptedTypes() {
      return this.type === "file" ? "image/*" : "*/*"
    },
  },
}
</script>
<style scoped>
.disabled {
  background-color: lightgrey;
  opacity: 0.8;
  color: grey;
}
</style>
