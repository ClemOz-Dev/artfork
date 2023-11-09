<template>
  <div
    v-if="artist"
    class="artist-container"
    :class="cardClass"
    @click="showDetail"
  >
    <div
      :class="{
        avatar: true,
        'mr-4': !isArtistsHomeExhibitionPage,
        'mx-auto': isArtistsHomeExhibitionPage,
      }"
    >
      <div
        class="image-container"
        :class="{
          'w-24 rounded': !isHomePage,
          'w-48 h-60': isHomePage,
        }"
      >
        <img v-if="artist.image" :src="artist.image" alt="Avatar" />
        <img v-else src="/img/avatar.png" alt="avatar" />
      </div>
    </div>
    <div v-if="!isHomePage" class="card-body justify-center">
      <h2 class="card-title mt-2 text-center font-bold">
        {{ fullName }}
      </h2>
      <p>Nationalité: {{ artist.nationality }}</p>
      <p>Née le {{ birthdateFormat }}</p>
      <div
        v-if="isArtistsHomeExhibitionPage"
        class="mt-2 card-actions flex items-center justify-center"
      >
        <router-link
          :to="{ name: 'artists-id', params: { id: artist.id } }"
          class="font-bold hover:underline flex items-center justify-center"
          >Voir ses œuvres</router-link
        >
      </div>
    </div>
    <div class="flex justify-between p-1" v-else>
      <h2 class="text-sm">
        {{ fullName }}
      </h2>
      <p class="text-sm">{{ artist.nationality }}</p>
    </div>
  </div>
</template>

<script>
import formatDateToFrench from "@/utils/date.js"

export default {
  name: "ArtistCard",
  props: {
    artist: {
      type: Object,
      required: true,
      default: null,
    },
  },
  computed: {
    isHomePage() {
      return this.$route.name === "home"
    },
    isArtistsHomeExhibitionPage() {
      return (
        this.$route.name === "artists" ||
        this.$route.name === "home" ||
        this.$route.name === "exhibitions-id"
      )
    },
    cardClass() {
      return {
        flex: !this.isArtistsHomeExhibitionPage,
        "justify-center": !this.isArtistsHomeExhibitionPage,
        "items-center": !this.isArtistsHomeExhibitionPage,
        "mx-auto": this.isArtistsHomeExhibitionPage,
      }
    },
    fullName() {
      const firstName = this.artist?.firstName ?? ""
      const lastName = this.artist?.lastName ?? ""

      if (firstName === "" && lastName === "") {
        return "Artiste inconnu"
      }
      return `${firstName} ${lastName}`
    },
    birthdateFormat() {
      return formatDateToFrench(this.artist.birthdate)
    },
  },
  methods: {
    showDetail() {
      this.$router.push({ name: "artists-id", params: { id: this.artist.id } })
    },
  },
}
</script>

<style lang="scss" scoped>
.artist-container {
  margin: 10px;
  border-radius: 12px;
  -webkit-box-shadow: 0 0 12px 3px rgba(73, 73, 73, 0.37);
  box-shadow: 0 0 12px 3px rgba(73, 73, 73, 0.37);
  &:hover {
    cursor: pointer;
  }
}

img {
  border-radius: 12px 12px 0 0;
}
.avatar {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
