<template>
  <header
    class="px-4 py-2 md:px-6 md:py-4 flex flex-col md:flex-row items-center justify-center md:justify-end"
  >
    <h1 class="text-lg font-bold text-center md:text-right">
      <slot name="title"></slot>
    </h1>
  </header>
</template>

<script>
export default {
  name: "TheHeader",
}
</script>
