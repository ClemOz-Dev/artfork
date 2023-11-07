<template>
  <TheHeader>
    <template #title>
      {{ title }}
    </template>
  </TheHeader>
  <TheArtistList />
</template>
<script>
import TheArtistList from "../../components/artist/list/TheArtistList.vue"
import TheHeader from "../../components/layout/TheHeader.vue"

export default {
  name: "ArtistPage",
  components: { TheHeader, TheArtistList },
  data() {
    return {
      title: "Les Artistes",
    }
  },
}
</script>
