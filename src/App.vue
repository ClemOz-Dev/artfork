<template>
  <div class="h-screen flex flex-col">
    <NavBar />
    <main class="flex-grow bg-white">
      <router-view />
    </main>
    <TheFooter />
  </div>
</template>
<script>
import NavBar from "./components/layout/NavBar.vue"
import TheFooter from "./components/layout/TheFooter.vue"

export default {
  name: "App",
  components: {
    NavBar,
    TheFooter,
  },
  async beforeMount() {
    await this.$store.dispatch("authStore/checkToken")
  },
}
</script>
