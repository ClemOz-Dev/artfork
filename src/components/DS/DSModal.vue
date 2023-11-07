<template>
  <div class="fixed inset-0 flex items-center justify-center z-50">
    <div class="bg-white w-64 p-4 rounded shadow-lg">
      <slot name="actions" />
      <div class="flex justify-end">
        <button
          @click="validate"
          class="bg-red-500 text-white px-4 py-2 rounded mr-2"
        >
          Confirmer
        </button>
        <button
          @click="cancel"
          class="bg-gray-300 text-gray-700 px-4 py-2 rounded"
        >
          Annuler
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    validate() {
      this.$emit("validate")
    },
    cancel() {
      this.$emit("cancel")
    },
  },
}
</script>
