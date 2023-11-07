<template>
  <TheHeader>
    <template #title>
      {{ title }}
    </template>
  </TheHeader>
  <TheArtWorkList />
</template>
<script>
import TheArtWorkList from "../../components/artwork/list/TheArtworkList.vue"
import TheHeader from "../../components/layout/TheHeader.vue"

export default {
  name: "ArtworksPage",
  components: { TheHeader, TheArtWorkList },
  data() {
    return {
      title: "Les Oeuvres",
    }
  },
}
</script>
