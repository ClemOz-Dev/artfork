<template>
  <div
    v-if="!isHomePage"
    class="grid grid-cols-1 md:grid-cols-3 gap-4 ml-[90px]"
  >
    <ExhibitionListCardItem
      v-for="(exhibition, index) in exhibitions"
      :key="index"
      :exhibition="exhibition"
    />
  </div>
  <div v-else>
    <ExhibitionListCardItem
      v-for="(exhibition, index) in showFirstFourExhibitions"
      :key="index"
      :exhibition="exhibition"
    />
  </div>
</template>

<script>
import ExhibitionListCardItem from "./ExhibitionListCardItem.vue"

export default {
  components: {
    ExhibitionListCardItem,
  },
  computed: {
    isHomePage() {
      return this.$route.name === "home"
    },
    exhibitions() {
      return this.$store.state.exhibitionStore.exhibitions
    },
    showFirstFourExhibitions() {
      return this.exhibitions.slice(0, 3)
    },
  },
  beforeMount() {
    this.fetchExhibitions()
  },
  methods: {
    async fetchExhibitions() {
      this.$store.dispatch("exhibitionStore/fetchExhibitions")
    },
  },
}
</script>
