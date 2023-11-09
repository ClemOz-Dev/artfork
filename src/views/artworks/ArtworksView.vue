<template>
  <MainHeader>
    <template #title>
      {{ title }}
    </template>
  </MainHeader>
  <ArtworkList />
</template>
<script>
import ArtworkList from "@/components/artwork/list/ArtworkList.vue"
import MainHeader from "@/components/layout/MainHeader.vue"

export default {
  name: "ArtworksView",
  components: { MainHeader, ArtworkList },
  data() {
    return {
      title: "Les Oeuvres",
    }
  },
}
</script>
