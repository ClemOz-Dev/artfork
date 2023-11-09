<template>
  <swiper
    :navigation="true"
    :slidesPerView="1"
    :loop="true"
    :breakpoints="{
      '640': {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      '768': {
        slidesPerView: 4,
        spaceBetween: 20,
      },
      '1024': {
        slidesPerView: 3,
        spaceBetween: 0,
      },
    }"
    :modules="modules"
    class="artworkSwiper bg-transparent"
  >
    <swiper-slide
      class="bg-transparent flex justify-center p-2"
      v-for="artwork in artworks"
      :key="artwork.id"
    >
      <div @click="redirectToArtwork(artwork)">
        <ArtworkListCardItem
          :artwork="artwork"
        />
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>
// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from "swiper/vue"
import { Autoplay, Pagination, Navigation } from "swiper/modules"
import ArtworkListCardItem from "./ArtworkListCardItem/ArtworkListCardItem.vue"

// eslint-disable-next-line import/no-unresolved
import "swiper/css"
// eslint-disable-next-line import/no-unresolved
import "swiper/css/pagination"
// eslint-disable-next-line import/no-unresolved
import "swiper/css/navigation"

export default {
  name: "ArtWorkListCard",
  components: {
    Swiper,
    SwiperSlide,
    ArtworkListCardItem,
  },
  props: {
    artworks: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      modules: [Autoplay, Pagination, Navigation],
    }
  },
  methods: {
    redirectToArtwork(artwork) {
      this.$router.push({ name: "artworks-id", params: { id: artwork.id } })
    },
  },
}
</script>
