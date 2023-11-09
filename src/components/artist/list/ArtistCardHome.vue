<template>
  <div
      v-if="artist"
      class="artist-container"
      @click="showDetail"
  >
    <div
        class="mx-auto"
        :class="{avatar: true}"
    >
      <div
          class="image-container w-48 h-60"
      >
        <img v-if="artist.image" :src="artist.image" alt="Avatar"/>
        <img v-else src="/img/avatar.png" alt="avatar"/>
      </div>
    </div>

    <div class="flex justify-between p-1">
      <h2 class="text-sm">
        {{ fullName }}
      </h2>
      <p class="text-sm">{{ artist.nationality }}</p>
    </div>
  </div>
</template>

<script>
import formatDateToFrench from "@/utils/date"

export default {
  name: "ArtistCardHome",
  props: {
    artist: {
      type: Object,
      required: true,
      default: null,
    },
  },
  computed: {
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
