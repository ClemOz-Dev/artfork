<template>
  <div>
    <div v-for="artist in artists" :key="artist.id" class="mb-4">
      <!-- ArtistListCardItem (on the first row) -->
      <div class="flex items-start mb-4 ms-4">
        <ArtistCard :artist="artist" />
      </div>
      <!-- ArtworkListCard (displayed below ArtistListCardItem) -->
      <ArtworksList :artworks="artist.artworks" />
    </div>

    <div ref="bottom" style="height: 1px"></div>
  </div>
</template>

<script>
import ArtistCard from "@/components/artist/ArtistCard.vue"
import ArtworksList from "@/components/artwork/list/ArtworksList.vue"

export default {
  name: "ArtworksArtistList",
  components: {
    ArtistCard,
    ArtworksList,
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
