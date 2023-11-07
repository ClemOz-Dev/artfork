<template>
  <div v-if="artist" class="flex flex-wrap">
    <div :class="cardClass">
      <div
        :class="{
          avatar: true,
          'mr-4': !isArtistsHomeExhibtionPage,
          'mx-auto': isArtistsHomeExhibtionPage,
        }"
      >
        <div
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
          v-if="isArtistsHomeExhibtionPage"
          class="mt-2 card-actions flex items-center justify-center"
        >
          <router-link
            :to="{ name: 'artists-id', params: { id: artist.id } }"
            class="font-bold hover:underline flex items-center justify-center"
            >Voir ses œuvres</router-link
          >
        </div>
      </div>
      <router-link
        :to="{ name: 'artists-id', params: { id: artist.id } }"
        class="hover:underline flex justify-between"
        v-else
      >
        <h2 class="text-sm">
          {{ fullName }}
        </h2>
        <p class="text-sm">{{ artist.nationality }}</p>
      </router-link>
    </div>
  </div>
</template>

<script>
import formatDateToFrench from "../../../utils/date.js"

export default {
  name: "ArtistListCardItem",
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
    isArtistsHomeExhibtionPage() {
      return (
        this.$route.name === "artists" ||
        this.$route.name === "home" ||
        this.$route.name === "exhibitions-id"
      )
    },
    isArtistDetailPage() {
      return this.$route.name === "artists-id"
    },
    cardClass() {
      return {
        flex: !this.isArtistsHomeExhibtionPage,
        "justify-center": !this.isArtistsHomeExhibtionPage,
        "items-center": !this.isArtistsHomeExhibtionPage,
        "mx-auto": this.isArtistsHomeExhibtionPage,
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
}
</script>

<style scoped>
.avatar {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
