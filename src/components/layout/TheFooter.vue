<template>
  <footer
      class="footer static bottom-0 left-0 w-full flex items-center justify-evenly p-3 text-white"
  >
    <router-link class="px-2" :to="{ name: 'contact' }"
    >Nous contacter
    </router-link
    >
    <router-link class="px-2" :to="{ name: 'cgv' }"
    >Mentions légales
    </router-link
    >
  </footer>
</template>
<script>
export default {
  name: "TheFooter",
}
</script>

<style scoped>
.footer {
  background: rgb(204, 85, 24);
  background: linear-gradient(335deg, rgba(204, 85, 24, 1) 14%, rgba(233, 74, 74, 1) 64%);
}
</style>
