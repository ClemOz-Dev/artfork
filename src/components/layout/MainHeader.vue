<template>
  <header
    class="main-header"
  >
    <h1 class="title" >
      <slot name="title"></slot>
    </h1>
  </header>
</template>

<script>
export default {
  name: "MainHeader",
}
</script>

<style lang="scss" scoped>
.main-header {
  margin: 12px 18px 12px 12px;
  text-align: right;

  .title {
    font-size: 36px;
    font-weight: bold;
  }
}
</style>
