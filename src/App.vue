<template>
  <div class="h-screen flex flex-col">
    <TheNavBar />
    <main class="flex-grow p-4 bg-white">
      <router-view />
    </main>
    <TheFooter />
  </div>
</template>
<script>
import TheNavBar from "./components/layout/TheNavBar.vue"
import TheFooter from "./components/layout/TheFooter.vue"

export default {
  name: "App",
  components: {
    TheNavBar,
    TheFooter,
  },
  async beforeMount() {
    await this.$store.dispatch("authStore/checkToken")
  },
}
</script>
