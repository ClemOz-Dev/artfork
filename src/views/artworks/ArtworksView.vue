<template>
  <MainHeader>
    <template #title>
      {{ title }}
    </template>
  </MainHeader>
  <ArtworksArtistList />
</template>
<script>
import ArtworksArtistList from "../../components/artwork/list/ArtworksArtistList.vue"
import MainHeader from "../../components/layout/MainHeader.vue"

export default {
  name: "ArtworksPage",
  components: { MainHeader, ArtworksArtistList },
  data() {
    return {
      title: "Les Oeuvres",
    }
  },
}
</script>
