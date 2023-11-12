<template>
  <div
    class="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 mb-2"
  >
    <ExhibitionListCardItem
      v-for="(exhibition, index) in exhibitions"
      :key="index"
      :exhibition="exhibition"
    />
  </div>
</template>

<script>
import ExhibitionListCardItem from "./ExhibitionListCardItem.vue"

export default {
  name: "ExhibitionList",
  components: {
    ExhibitionListCardItem,
  },
  props: {
    exhibitions: {
      type: Array,
      default: [],
    }
  },
}
</script>
