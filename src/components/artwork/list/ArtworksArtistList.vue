<template>
  <div>
    <div
        v-for="(artist, index) in artists"
        :key="artist.id"
        :class="{
          'artworks_full-list': true,
           'even-background': index % 2 === 0,
           'odd-background': index % 2 !== 0
        }">
      <div class="flex">
        <ArtistCardFull :artist="artist"/>
      </div>
      <SwipperCarousel :items="artist.artworks">
        <template v-slot="{ item }">
          <ArtworkCard :artwork="item"/>
        </template>
      </SwipperCarousel>
    </div>

    <div ref="bottom" style="height: 1px"></div>
  </div>
</template>

<script>
import ArtistCardFull from "../../artist/list/ArtistCardFull.vue"
import ArtworkListCard from "./ArtworkListCard.vue"
import SwipperCarousel from "@/components/UI/SwipperCarousel.vue";
import ArtworkCard from "@/components/artwork/list/ArtworkListCardItem/ArtworkListCardItem.vue";

export default {
  name: "TheArtWorkList",
  components: {
    ArtworkCard,
    SwipperCarousel,
    ArtistCardFull,
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

<style lang="scss" scoped>
.artworks_full-list {
  padding: 18px 12px 18px 12px;


  &.even-background {
    background: rgb(57,57,57);
background: linear-gradient(90deg, rgba(57,57,55,0.2) 0%, rgba(255,255,255,1) 71%);
  }

  &.odd-background {
background: rgb(103,43,12);
background: linear-gradient(90deg, rgba(103,43,12,0.2) 20%,  rgba(255,255,255,1) 71%);

  }
}


</style>
