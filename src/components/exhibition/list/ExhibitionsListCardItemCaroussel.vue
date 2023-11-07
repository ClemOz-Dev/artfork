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
    class="exhibitionSwiper"
  >
    <swiper-slide v-for="(exhibition, index) in exhibitions" :key="index">
      <ExhibitionListCardItem :exhibition="exhibition" />
    </swiper-slide>
  </swiper>
</template>

<script>
// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from "swiper/vue"
import { Autoplay, Pagination, Navigation } from "swiper/modules"
// eslint-disable-next-line import/no-unresolved
import ExhibitionListCardItem from "./ExhibitionListCardItem.vue"

export default {
  name: "ExhibitionListCardItemCaroussel",
  components: {
    Swiper,
    SwiperSlide,
    ExhibitionListCardItem,
  },
  data() {
    return {
      modules: [Autoplay, Pagination, Navigation],
    }
  },
  computed: {
    exhibitions() {
      return this.$store.state.exhibitionStore.exhibitions
    },
  },
  beforeMount() {
    this.fetchExhibitions()
  },
  methods: {
    async fetchExhibitions() {
      this.$store.dispatch("exhibitionStore/fetchExhibitions")
    },
  },
}
</script>
