<template>
  <ul class="localities-list">
    <li
      v-for="(locality, index) in localities"
      :key="index"
      class="search__item"
      @click="selectResult(locality)"
    >
      {{
        shouldDisplayAltValue(locality)
          ? "Aucune commune ne correspond au code postal"
          : getFormattedValue(locality)
      }}
    </li>
  </ul>
</template>

<script>
export default {
  name: "LocalitiesList",
  props: {
    localities: {
      type: Array,
      required: true,
    },
    selectResult: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      index: null,
    }
  },
  methods: {
    shouldDisplayAltValue(locality) {
      return locality.error
    },
    getFormattedValue(locality) {
      return `${locality.nomCommune} - ${locality.codePostal}`
    },
  },
}
</script>

<style lang="scss" scoped>
.localities-list {
  box-shadow: 16px 16px 40px -48px rgb(0 0 0);
  border-radius: 16px;
}

.search__item {
  width: 100%;
  padding: 1rem;
  border-bottom: 1px solid lightgrey;
  cursor: pointer;
  &:first-child {
    border-radius: 16px 16px 0 0;
  }
  &:last-child {
    border: initial;
    border-radius: 0 0 16px 16px;
  }
}

.search__item:hover {
  cursor: pointer;
  background-color: lightgrey;
  font-size: large;
}
</style>
