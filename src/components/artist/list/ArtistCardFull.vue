<template>
  <div>
  <div
      v-if="artist"
      class="artist-container"
      @click="showDetail"
  >
    <div>
      <div class="image-container">
        <img v-if="artist.image" :src="artist.image" alt="Avatar"/>
        <img v-else src="/img/avatar.png" alt="avatar"/>
      </div>
    </div>
    <div class="infos-container">
      <h2 class="artist-name">
        {{ fullName }}
      </h2>
      <div class="sub-infos">
        <p>Nationalité: {{ artist.nationality }}</p>
        <p>Née le {{ birthdateFormat }}</p>
      </div>
    </div>
  </div>
     <div
          v-if="isArtistsOrExhibitionPage"
          class="mt-2 flex items-center justify-center"
      >
        <router-link
            :to="{ name: 'artists-id', params: { id: artist.id } }"
            class="internal-link font-bold flex items-center justify-center"
        >Voir ses œuvres
        </router-link
        >
      </div>
  </div>
</template>

<script>
import formatDateToFrench from "@/utils/date"

export default {
  name: "ArtistCardFull",
  props: {
    artist: {
      type: Object,
      required: true,
      default: null,
    },
  },
  computed: {
    isArtistsOrExhibitionPage() {
      return (
          this.$route.name === "artists" ||
          this.$route.name === "exhibitions-id"
      )
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
      this.$router.push({name: "artists-id", params: {id: this.artist.id}})
    },
  },
}
</script>

<style lang="scss" scoped>
.artist-container {
  display: flex;
  height: 180px;

  border-radius: 12px;
  background-color: white;
  -webkit-box-shadow: 0 0 12px 3px rgba(73, 73, 73, 0.37);
  box-shadow: 0 0 12px 3px rgba(73, 73, 73, 0.37);

  &:hover {
    cursor: pointer;
  }

  .image-container {
    border-radius: 12px;
    height: 100%;
    background-color: #ef4444;
    display: flex;

    img {
      object-fit: cover;
        border-radius: 12px 0 0 12px;
    }
  }

  .infos-container {
    display: flex;
    padding: 10px;
    flex-direction: column;
    justify-content: space-between;
    text-align: right;



    .artist-name {
      font-size: 18px;
      font-weight: bold;
    }

    .sub-infos {
      font-size: 12px;
      font-style: italic;
    }
  }
}

.internal-link {
  &:hover {
    color: #ef4444;
  }
}



</style>
