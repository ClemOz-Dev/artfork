<template>
  <div class="flex flex-wrap -mx-4">
    <div
      v-for="(artist, index) in artists"
      :key="index"
      class="card w-full sm:w-1/3 lg:w-1/4 p-4 mb-6 shadow-base-200"
    >
      <ArtistListCard :artist="artist" />
    </div>
  </div>
</template>

<script>
import ArtistListCard from "./ArtistListCard.vue"

export default {
  name: "ArtistCard",
  components: { ArtistListCard },
  props: {
    artists: {
      type: Object,
      required: true,
    },
  },
}
</script>
