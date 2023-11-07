<template>
  <footer
    class="static bottom-0 left-0 w-full flex items-center justify-evenly p-3 bg-red-500 text-white"
  >
    <router-link class="px-2" :to="{ name: 'contact' }"
      >Nous contacter</router-link
    >
    <router-link class="px-2" :to="{ name: 'cgv' }"
      >Mentions légales</router-link
    >
  </footer>
</template>
<script>
export default {
  name: "TheFooter",
}
</script>
