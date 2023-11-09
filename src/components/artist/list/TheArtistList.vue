<template>
  <div class="flex flex-wrap">
    <div
      v-for="(artist, index) in artists"
      :key="index"
      class="card w-full sm:w-1/3 lg:w-1/4 p-4 mb-6 shadow-base-200"
    >
      <ArtistCardFull :artist="artist" />
    </div>
  </div>
</template>

<script>
import ArtistCardFull from "./ArtistCardFull.vue"

export default {
  name: "ArtistCard",
  components: { ArtistCardFull },
  props: {
    artists: {
      type: Object,
      required: true,
    },
  },
}
</script>
