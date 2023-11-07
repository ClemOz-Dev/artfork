<template>
  <div :class="cardClass">
    <div :class="imgClass">
      <img :src="exhibition.gallery.image" alt="Exhibtion gallery Image" />
      <div class="flex justify-between items-end">
        <p>
          {{
            isExhibitionDetailPage
              ? getFullLocation(exhibition.gallery)
              : getLocation(exhibition.gallery)
          }}
        </p>
      </div>
    </div>
    <div class="w-8/12">
      <h2 class="card-title mt-2 text-center font-bold">
        {{ exhibition.name }}
      </h2>
      <p class="text-xs">Du {{ formatStartDate }} au {{ formatEndDate }}</p>
      <p class="w-9/12" v-if="isExhibitionDetailPage">
        Description : <span>{{ exhibition.description }}</span>
      </p>
      <router-link
        v-if="!isExhibitionDetailPage"
        :to="{ name: 'exhibitions-id', params: { id: exhibition.id } }"
        class="font-bold hover:underline flex items-center justify-center"
        >Voir l'exposition</router-link
      >
    </div>
  </div>
</template>

<script>
import AddressMixin from "../../../mixins/AddressMixin.js"
import formatDateToFrench from "../../../utils/date.js"

export default {
  props: {
    exhibition: Object,
  },
  mixins: [AddressMixin],
  computed: {
    isExhibitionPage() {
      return this.$route.name === "exhibitions"
    },
    isExhibitionDetailPage() {
      return this.$route.name === "exhibitions-id"
    },
    formatStartDate() {
      return formatDateToFrench(this.exhibition.startDate)
    },
    formatEndDate() {
      return formatDateToFrench(this.exhibition.endDate)
    },
    cardClass() {
      return {
        flex: this.isExhibitionPage || this.isExhibitionDetailPage,
        "flex-col": this.isExhibitionPage,
        "flex-row-reverse": this.isExhibitionDetailPage,
      }
    },
    imgClass() {
      return {
        "w-8/12": this.isExhibitionPage,
        "w-4/12": this.isExhibitionDetailPage,
      }
    },
  },
}
</script>
