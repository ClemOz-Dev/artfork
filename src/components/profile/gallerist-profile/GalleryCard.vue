<template>
  <div
      class="gallery-card"
  >
    <img
        class="w-full h-40 object-cover rounded-t-lg"
        :src="gallery.image ?? '/img/brush.jpg'"
        :alt="gallery.description"
    />

    <div class="infos-container p-4">
      <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          v-html="formatFullAddressBroken(gallery)"
      />

      <button
          type="button"
          @click="this.$router.push({ name: 'exhibitions', query: { galerie: gallery.id } })"

          class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg "
      >
        Voir les expositions en cours / à venir
      </button>
    </div>
  </div>
</template>

<script>
import AddressMixin from "@/mixins/AddressMixin.js";

export default {
  name: "GalleryCard",
  mixins: [AddressMixin],
  props: {
    gallery: {
      type: Object,
      required: true,
    }
  }
}
</script>

<style lang="scss" scoped>
.gallery-card {
  width: 80%;
  height: 400px;
  border-radius: 12px;
  background-color: #424040;
  display: flex;
  flex-direction: column;
  -webkit-box-shadow: 0 0 12px 3px rgba(73, 73, 73, 0.37);
  box-shadow: 0 0 12px 3px rgba(73, 73, 73, 0.37);

  img {
    flex: 1;
    object-fit: fill;
  }

  .infos-container {
    display: flex;
    max-height: 40%;
    flex-direction: column;
    justify-content: end;
    background: rgba(255, 255, 255, 0.2 );
    backdrop-filter: blur(9px);
    -webkit-backdrop-filter: blur(9px);


    h5 {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    button {
      background-color: #ef4444;
      display: flex;
      justify-content: center;
    }
  }
}

</style>