<template>
  <div
    v-if="!isHomePage"
    class="grid grid-cols-1 md:grid-cols-3 gap-4 ml-[90px]"
  >
    <ExhibitionCard
      v-for="(exhibition, index) in exhibitions"
      :key="index"
      :exhibition="exhibition"
    />
  </div>
  <div v-else>
    <ExhibitionCard
      v-for="(exhibition, index) in showFirstFourExhibitions"
      :key="index"
      :exhibition="exhibition"
    />
  </div>
</template>

<script>
import ExhibitionCard from "./ExhibitionCard.vue"

export default {
  name: "ExhibitionList",
  components: {
    ExhibitionCard,
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
