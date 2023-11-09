<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 ml-[90px]">
    <ArtworkCard
      v-for="artwork in artworks"
      :artwork="artwork"
      :key="artwork.id"
    />
  </div>
</template>

<script>
import ArtworkCard from "@/components/artwork/list/ArtworkListCardItem/ArtworkListCardItem.vue"

export default {
  name: "ArtworksList",
  components: {
    ArtworkCard,
  },
  props: {
    artworks: {
      type: Array,
      required: true,
    },
  },
}
</script>
