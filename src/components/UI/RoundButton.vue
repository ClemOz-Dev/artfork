<template>
  <div class="button-container">
    <button
        class="text-white rounded-full w-16 h-16 flex items-center justify-center hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        @click="callBack"
        @mouseover="showExplanation"
        @mouseout="hideExplanation"
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
    <div class="explanation" v-if="isExplanationVisible">{{ explanation }}</div>
    <div v-else style="height: 24px" />
  </div>
</template>

<script>
export default {
  name: "RoundButton",
  props: {
    explanation: {
      type: String,
      default: "",
    }
  },
  data() {
    return {
      isExplanationVisible: false,
    }
  },
  methods: {
    showExplanation() {
      this.isExplanationVisible = true;
    },
    hideExplanation() {
      this.isExplanationVisible = false;
    },
    callBack() {
      this.$emit("callback-called")
    },
  },
}
</script>

<style lang="scss" scoped>
.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  button {
    background-color: #ef4444;
  }

  .explanation {
    font-style: italic;
    color: #ef4444;
  }
}

</style>
