<template>
  <TheHeader>
    <template #title>
      {{ title }}
    </template>
  </TheHeader>
  <TheArtistList :artists="artists" />
</template>
<script>
import TheArtistList from "../../components/artist/list/TheArtistList.vue"
import TheHeader from "../../components/layout/TheHeader.vue"
import {mapGetters} from "vuex";

export default {
  name: "ArtistPage",
  components: { TheHeader, TheArtistList },
  data() {
    return {
      title: "Les Artistes",
    }
  },
  computed:{
    ...mapGetters("artistStore", ['artists'])
  },
  async beforeMount() {
    await this.fetchArtists()
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
