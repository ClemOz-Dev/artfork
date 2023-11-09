<template>
  <swiper
    direction="horizontal"
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
        slidesPerView: 2,
        spaceBetween: 40,
      },
      '1024': {
        slidesPerView: displayedCount,
        spaceBetween: 80,
      },
    }"
    :modules="modules"
    class="swipper-carousel"
  >
    <swiper-slide class="bg-transparent" v-for="(item, index) in items" :key="index">
      <slot :item="item"></slot>
    </swiper-slide>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue"
import { Autoplay, Pagination, Navigation } from "swiper/modules"

export default {
  name: "SwipperCarousel",
  components: { Swiper, SwiperSlide },
  props: {
    items: {
      type: Array,
      required: true,
    },
    displayedCount: {
      type: Number,
      default: 3,
    },
  },
  data() {
    return {
      modules: [Autoplay, Pagination, Navigation],
    }
  },
}
</script>
<style scoped>
.swipper-carousel {
  display: flex;
  padding: 6px 0 6px 0;
}
</style>
