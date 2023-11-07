<template>
  <swiper
    :navigation="true"
    :slidesPerView="1"
    :spaceBetween="30"
    :loop="true"
    :breakpoints="{
      '640': {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      '768': {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      '1024': {
        slidesPerView: 5,
        spaceBetween: 0,
      },
    }"
    :modules="modules"
    class="artistSwiper"
  >
    <swiper-slide v-for="(artist, index) in artists" :key="index">
      <div @click="redirectToArtist(artist)">
        <ArtistListCardItem
          class="cursor-pointer hover:brightness-75"
          :artist="artist"
        />
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>
// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from "swiper/vue"
import { Autoplay, Pagination, Navigation } from "swiper/modules"
import ArtistListCardItem from "./ArtistListCardItem.vue"

export default {
  name: "ArtistListCardItemCaroussel",
  components: { ArtistListCardItem, Swiper, SwiperSlide },
  data() {
    return {
      modules: [Autoplay, Pagination, Navigation],
    }
  },
  computed: {
    artists() {
      return this.$store.state.artistStore.artists
    },
  },
  beforeMount() {
    this.fetchArtists()
  },
  methods: {
    async fetchArtists() {
      const payload = {
        offset: 0,
        limit: 100,
        artworks: false,
      }
      this.$store.dispatch("artistStore/fetchArtists", payload)
    },
    redirectToArtist(artist) {
      this.$router.push({ name: "artists-id", params: { id: artist.id } })
    },
  },
}
</script>
