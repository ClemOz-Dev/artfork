<template>
  <TheHeader>
    <template #title>
      {{ title }}
    </template>
  </TheHeader>
  <ExhibitionsList />
</template>
<script>
import TheHeader from "../../components/layout/TheHeader.vue"
import ExhibitionsList from "../../components/exhibition/list/TheExhibitionsList.vue"

export default {
  name: "ExhibitionPage",
  components: { TheHeader, ExhibitionsList },
  data() {
    return {
      title: "Les Expositions",
    }
  },
}
</script>
