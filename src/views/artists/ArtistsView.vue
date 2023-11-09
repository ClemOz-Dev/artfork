<template>
  <MainHeader>
    <template #title>
      {{ title }}
    </template>
  </MainHeader>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 ml-[90px]">
    <ArtistCard v-for="artist in artists" :artist="artist" :key="artist.id" />
  </div>
</template>
<script>
import MainHeader from "@/components/layout/MainHeader.vue"
import ArtistCard from "@/components/artist/list/ArtistCard.vue"
import { mapGetters } from "vuex"

export default {
  name: "ArtistPage",
  components: { ArtistCard, MainHeader },
  data() {
    return {
      title: "Les Artistes",
    }
  },
  async beforeMount() {
    await this.fetchArtists()
  },
  computed: {
    ...mapGetters("artistStore", ["artists"]),
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
  },
}
</script>
