<template>
  <div class="flex flex-wrap">
    <slot></slot>
  </div>

  <div
    :class="{ 'flex justify-between': canScrollLeft || canScrollRight }"
    class="mt-4"
  >
    <button @click="scrollItems(-3)" v-if="canScrollLeft" class="p-2 text-2xl">
      ←
    </button>
    <div v-else></div>
    <button @click="scrollItems(3)" v-if="canScrollRight" class="p-2 text-2xl">
      →
    </button>
  </div>
</template>

<script>
export default {
  name: "CustomCarousel",
  props: {
    itemsCount: Number,
    currentPage: Number,
  },
  emits: ["page-change"],
  computed: {
    canScrollLeft() {
      return this.currentPage > 0
    },
    canScrollRight() {
      return this.currentPage + 3 < this.itemsCount
    },
  },
  methods: {
    scrollItems(step) {
      if (
        this.currentPage + step >= 0 &&
        this.currentPage + step < this.itemsCount
      ) {
        const newPage = this.currentPage + step
        this.$emit("page-change", newPage)
      }
    },
  },
}
</script>

<style scoped></style>
