<template>
  <div>
    <div v-for="artist in artists" :key="artist.id" class="mb-4">
      <!-- ArtistListCardItem (on the first row) -->
      <div class="flex items-start mb-4 ms-4">
        <ArtistListCard :artist="artist" />
      </div>
      <!-- ArtworkListCard (displayed below ArtistListCardItem) -->
      <SwipperCarousel :items="artist.artworks">
        <template v-slot="{ item }">
        <ArtworkCard :artwork="item" />
      </template>
      </SwipperCarousel>
    </div>

    <div ref="bottom" style="height: 1px"></div>
  </div>
</template>

<script>
import ArtistListCard from "../../artist/list/ArtistListCard.vue"
import ArtworkListCard from "./ArtworkListCard.vue"
import SwipperCarousel from "@/components/UI/SwipperCarousel.vue";
import ArtworkCard from "@/components/artwork/list/ArtworkListCardItem/ArtworkListCardItem.vue";

export default {
  name: "TheArtWorkList",
  components: {
    ArtworkCard,
    SwipperCarousel,
    ArtistListCard,
    ArtworkListCard,
  },
  data() {
    return {
      offset: 0,
      isLoading: false,
    }
  },
  computed: {
    artists() {
      return this.$store.state.artistStore.artists
    },
  },
  methods: {
    async loadMoreArtists() {
      if (this.isLoading) return

      this.isLoading = true
      const payload = {
        offset: this.offset,
        limit: 100,
        artworks: true,
      }
      try {
        await this.$store.dispatch("artistStore/fetchArtists", payload)

        if (this.artists.length > 0) {
          this.offset += this.artists.length
        }
      } catch (error) {
        console.error(error)
        throw error
      } finally {
        this.isLoading = false
      }
    },
  },
  beforeUnmount() {
    this.$store.dispatch("artistStore/resetArtists")
  },
  beforeMount() {
    this.loadMoreArtists()
  },
  mounted() {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        this.loadMoreArtists()
      }
    }, options)

    observer.observe(this.$refs.bottom)
  },
}
</script>
