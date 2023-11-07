<template>
  <div>
    <nav
      class="flex items-center justify-between p-6 bg-red-500 text-white z-50 relative"
    >
      <router-link class="text-2xl font-bold" :to="{ name: 'home' }"
        >ArtBook</router-link
      >
      <div class="hidden md:flex justify-between flex-grow">
        <div
          class="flex xl:gap-12 items-center justify-center flex-grow space-x-16 font-bold"
        >
          <router-link
            :to="{ name: 'artworks' }"
            class="hover:text-black"
            :class="{ 'text-black underline': $route.name === 'artworks' }"
          >
            Les Oeuvres
          </router-link>
          <router-link
            :to="{ name: 'artists' }"
            class="hover:text-black"
            :class="{ 'text-black underline': $route.name === 'artists' }"
          >
            Les Artistes
          </router-link>
          <router-link
            :to="{ name: 'exhibitions' }"
            class="hover:text-black"
            :class="{ 'text-black underline': $route.name === 'exhibitions' }"
          >
            Les Expositions
          </router-link>
        </div>
        <div class="dropdown dropdown-bottom dropdown-end">
          <button tabindex="0" class="hover:text-black" @click="toggleDropdown">
            <IconAvatar />
          </button>
          <ul
            v-if="dropdownOpen"
            tabindex="0"
            class="dropdown-content z-[1] menu p-2 shadow bg-white font-bold rounded-box w-52"
          >
            <li v-if="!isConnected">
              <router-link
                :to="{ name: 'login' }"
                class="text-black hover:text-red-500"
                :class="{ 'text-black underline': $route.name === 'login' }"
                @click="closeDropdown"
              >
                Connexion
              </router-link>
            </li>
            <li v-if="!isConnected">
              <router-link
                :to="{ name: 'register' }"
                class="text-black hover:text-red-500"
                :class="{ 'text-black underline': $route.name === 'register' }"
                @click="closeDropdown"
              >
                Inscription
              </router-link>
            </li>
            <li v-if="isConnected">
              <router-link
                :to="{ name: 'profile' }"
                class="text-black hover:text-red-500"
                @click="closeDropdown"
              >
                Mon Profil
              </router-link>
            </li>
            <li v-if="isConnected">
              <button
                class="mt-2 w-full text-white bg-red-500 py-2 rounded-2 hover:bg-red-800 flex hover:text-white"
              >
                <router-link
                  :to="{ name: 'profile' }"
                  class="flex items-center"
                  @click="logout"
                >
                  Déconnexion
                  <span class="ml-2"><IconPower /></span>
                </router-link>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <button @click="toggleMenu" class="md:hidden">
        <span class="text-2xl">☰</span>
      </button>
    </nav>
    <div
      v-if="menuOpen"
      class="md:hidden flex flex-col items-center bg-red-500 text-white font-bold z-50 relative"
    >
      <router-link
        :to="{ name: 'artworks' }"
        class="mb-2 hover:text-black hover:underline"
        :class="{ 'text-black underline': $route.name === 'artworks' }"
        @click="closeMenu"
      >
        Les Oeuvres
      </router-link>
      <router-link
        :to="{ name: 'artists' }"
        class="mb-2 hover:text-black hover:underline"
        :class="{ 'text-black underline': $route.name === 'artists' }"
        @click="closeMenu"
      >
        Les Artistes
      </router-link>
      <router-link
        :to="{ name: 'exhibitions' }"
        class="mb-2 hover:text-black hover:underline"
        :class="{ 'text-black underline': $route.name === 'exhibitions' }"
        @click="closeMenu"
      >
        Les Expositions
      </router-link>
      <router-link
        v-if="isConnected"
        :to="{ name: 'profile' }"
        class="mb-2 hover:text-black hover:underline"
        :class="{ 'text-black underline': $route.name === 'profile' }"
        @click="closeMenu"
      >
        Mon Profil
      </router-link>
      <router-link
        v-if="!isConnected"
        :to="{ name: 'login' }"
        class="mb-2 hover:text-black hover:underline"
        :class="{ 'text-black underline': $route.name === 'login' }"
        @click="closeMenu"
      >
        Connexion
      </router-link>
      <router-link
        v-if="!isConnected"
        :to="{ name: 'register' }"
        class="mb-2 hover:text-black hover:underline"
        :class="{ 'text-black underline': $route.name === 'register' }"
        @click="closeMenu"
      >
        Inscription
      </router-link>
      <button
        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mb-1 flex items-center"
        :class="{ 'text-black underline': $route.name === 'register' }"
        @click="closeMenu"
      >
        <router-link
          v-if="isConnected"
          :to="{ name: 'profile' }"
          class="flex items-center"
          @click="logout"
        >
          Déconnexion
          <span class="ml-2">
            <IconPower />
          </span>
        </router-link>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import IconAvatar from "../UI/ImagesAndIcons/IconAvatar.vue";
import IconPower from "../UI/ImagesAndIcons/IconPower.vue";
import DropDownMixin from "../../mixins/DropDownMixin.js";

export default {
  name: "TheNavBar",
  components: { IconPower, IconAvatar },
  mixins: [DropDownMixin],
  data() {
    return {
      menuOpen: false,
      dropDownOpen: false,
    };
  },
  computed: {
    ...mapGetters("authStore", ["isConnected"]),
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    closeMenu() {
      this.menuOpen = false;
    },
    async logout() {
      await this.$store.dispatch("authStore/logout");
      await this.$store.dispatch("userStore/resetMe");
      this.$router.push({ name: "login" });
    },
  },
};
</script>
