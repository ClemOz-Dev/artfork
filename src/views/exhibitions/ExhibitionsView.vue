<template>
  <MainHeader>
    <template #title>
      {{ title }}
    </template>
  </MainHeader>
  <ExhibitionsList />
</template>
<script>
import MainHeader from "@/components/layout/MainHeader.vue"
import ExhibitionsList from "@/components/exhibition/list/ExhibitionsList.vue"
import SwipperCarousel from "@/components/UI/SwipperCarousel.vue"

export default {
  name: "ExhibitionView",
  components: { SwipperCarousel,MainHeader, ExhibitionsList },
  data() {
    return {
      title: "Les Expositions",
      items: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
    }
  },
}
</script>
