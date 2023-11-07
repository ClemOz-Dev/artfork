<template>
  <button
    class="text-white rounded-full w-16 h-16 flex items-center justify-center hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
    @click="callBack"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-8 w-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 4v16m8-8H4"
      ></path>
    </svg>
  </button>
</template>

<script>
export default {
  name: "RoundButton",
  methods: {
    callBack() {
      this.$emit("callback-called")
    },
  },
}
</script>

<style scoped>
button {
  background-color: #ef4444;
}
</style>
