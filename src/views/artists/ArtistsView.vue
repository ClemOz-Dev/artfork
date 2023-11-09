<template>
  <MainHeader>
    <template #title>
      {{ title }}
    </template>
  </MainHeader>
  <SpinningLoader v-if="isLoading" />
  <TheArtistList v-else :artists="artists" />
</template>
<script>
import TheArtistList from "../../components/artist/list/TheArtistList.vue"
import MainHeader from "../../components/layout/MainHeader.vue"
import {mapGetters} from "vuex";
import SpinningLoader from "@/components/UI/SpinningLoader.vue";

export default {
  name: "ArtistsView",
  components: {SpinningLoader, MainHeader: MainHeader, TheArtistList },
  data() {
    return {
      isLoading: false,
      title: "Les Artistes",
    }
  },
  computed:{
    ...mapGetters("artistStore", ['artists'])
  },
  async beforeMount() {
    this.isLoading = true
    await this.fetchArtists()
    this.isLoading = false
  },
  methods: {
    async fetchArtists() {
      const payload = {
        offset: 0,
        limit: 100,
        artworks: false,
      }
      this.$store.dispatch("artistStore/fetchArtists", payload)
    },
  }
}
</script>
