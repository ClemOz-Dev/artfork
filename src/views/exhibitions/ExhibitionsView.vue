<template>
  <MainHeader>
    <template #title>
      {{ title }}
    </template>
  </MainHeader>
  <SpinningLoader v-if="isLoading" />
  <ExhibitionsList :exhibitions="exhibitions" />
</template>
<script>
import MainHeader from "@/components/layout/MainHeader.vue"
import ExhibitionsList from "@/components/exhibition/list/TheExhibitionsList.vue"
import SpinningLoader from "@/components/UI/SpinningLoader.vue";
import {mapGetters} from "vuex";

export default {
  name: "ExhibitionPage",
  components: {SpinningLoader, MainHeader, ExhibitionsList },
  data() {
    return {
      isLoading: false,
      title: "Les Expositions",
    }
  },
  computed: {
    ...mapGetters("exhibitionStore", ["exhibitions"]),
  },
  async beforeMount() {
    this.isLoading = true
    await this.fetchExhibitions()
    this.isLoading = false
  },
  methods: {
    async fetchExhibitions() {
      this.$store.dispatch("exhibitionStore/fetchExhibitions")
    },
  }
}
</script>
