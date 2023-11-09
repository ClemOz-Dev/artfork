<template>
  <div class="artist-overview">
    <div class="image-container">
      <img v-if="artist.image" :src="artist.image" :alt="artist.lastName" />
      <img v-else src="/img/avatar.png" alt="avatar" />
    </div>
    <div class="infos-container">
      <div>
        <div class="artist-name">{{ getFullName }}</div>
        <div class="artist-nationality">
          Nationalité: {{ artist.nationality }}
        </div>
        <div class="artist-birth">
          Née le {{ formatDateToFrench(this.artist.birthdate) }}
        </div>
      </div>
      <div class="artist-description">
        {{ artist.description }}
      </div>
    </div>
  </div>
</template>

<script>
import formatDateToFrench from "../../../utils/date"

export default {
  name: "ArtistOverview",
  methods: { formatDateToFrench },
  props: {
    artist: {
      type: Object,
      required: true,
    },
  },
  computed: {
    getFullName() {
      const { firstName, lastName } = this.artist
      if (!firstName || !lastName) {
        return "Artiste inconnu"
      }
      return `${firstName} ${lastName}`
    },
  },
}
</script>

<style lang="scss" scoped>
.artist-overview {
  display: flex;
  width: auto;
  margin: 0 0 24px 90px;

  .image-container {
    img {
      height: 200px;
    }
  }

  .infos-container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 18px;
    .artist-name {
      font-size: 36px;
      font-weight: bold;
    }

    .artist-description {
      font-style: italic;
      font-size: 18px;
    }
  }
}
</style>
