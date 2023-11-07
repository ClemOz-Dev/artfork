<template>
  <div>
    <CustomCarousel
      v-if="myGalleries"
      :items-count="myGalleries.length"
      :current-page="currentPage"
      @page-change="handlePageChange"
    >
      <div
        v-for="gallery in displayedGalleries"
        :key="gallery.id"
        class="w-full md:w-1/2 lg:w-1/3 p-4"
      >
        <div
          class="max-w-md max-h-xs mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <img
            class="w-full h-40 object-cover rounded-t-lg"
            :src="gallery.image ?? '/img/brush.jpg'"
            :alt="gallery.description"
          />

          <div class="p-4">
            <a href="#">
              <h5
                class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
              >
                {{ formatFullAddress(gallery) }}
              </h5>
            </a>
            <p class="mb-2 font-normal text-gray-700 dark:text-gray-400">
              {{ gallery.description }}
            </p>
            <a
              href="#"
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover-bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark-bg-blue-600 dark-hover-bg-blue-700 dark-focus:ring-blue-800"
            >
              Voir plus...
              <svg
                class="w-3.5 h-3.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </CustomCarousel>
    <GalleryForm @update="handleGalleryCreate" />
    <ExhibitionForm />
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import GalleryApiService from "../../../services/api/GalleryApiService"
import CustomCarousel from "../../UI/CustomCarousel.vue"
import AddressMixin from "../../../mixins/AddressMixin"
import GalleryForm from "./components/forms/GalleristForm.vue"
import ExhibitionForm from "./components/forms/ExhibitionForm.vue"
import store from "../../../store/index"

export default {
  name: "GalleryProfile",
  mixins: [AddressMixin],
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { CustomCarousel, ExhibitionForm, GalleryForm },
  data() {
    return {
      isLoading: false,
      currentPage: 0,
      showLocations: false,
      localities: [],
      selectedCity: null,
    }
  },
  computed: {
    ...mapGetters("userStore", ["currentUser", "myGalleries"]),
    displayedGalleries() {
      console.log("Galleries :", this.myGalleries)
      const startIndex = this.currentPage
      const endIndex = startIndex + 3
      return this.myGalleries.slice(startIndex, endIndex)
    },
  },
  async beforeMount() {
    await this.fetchGalleries()
  },
  methods: {
    async handleGalleryCreate() {
      await this.fetchGalleries()
    },
    handlePageChange(newPage) {
      this.currentPage = newPage
    },
    async fetchGalleries() {
      const galleries = await GalleryApiService.getGalleriesByGallerist(
        this.getMe.id,
      )
      store.commit("userStore/SET_MY_GALLERIES", galleries)
    },
  },
}
</script>
<style lang="scss">
.add-gallery {
  padding: 50px;
}

.add-gallery button {
  background: #ef4444;
  height: 40px;
  color: white;
  font-weight: 700;
  width: 315px;
  border-radius: 6.7px;
  margin-top: 2rem;
}

.add-gallery-form {
  width: 50%;
  display: flex;
  flex-wrap: wrap;
}

h3 {
  font-size: 32px;
  font-weight: 700;
}

/*Média-queries*/
@media all and (max-width: 768px) {
  .add-gallery {
    padding: 0;
    margin-top: 40px;
  }

  .add-gallery button {
    width: 100%;
  }

  .add-gallery-form {
    width: 100%;
  }
}
</style>
