<template>
  <TheHeader>
    <template #title>
      {{ title }}
    </template>
  </TheHeader>
  <ArtworksArtistList />
</template>
<script>
import ArtworksArtistList from "../../components/artwork/list/ArtworksArtistList.vue"
import TheHeader from "../../components/layout/TheHeader.vue"

export default {
  name: "ArtworksPage",
  components: { TheHeader, ArtworksArtistList },
  data() {
    return {
      title: "Les Oeuvres",
    }
  },
}
</script>
