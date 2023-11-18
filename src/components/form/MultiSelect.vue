<template>
  <div class="flex mt-6 flex-col">
    <label class="typo__label">Oeuvres disponibles</label>
    <multiselect
        v-model="selectedValues"
        :options="options"
        :multiple="true"
        :close-on-select="false"
        :clear-on-select="false"
        :preserve-search="true"
        label="name"
        track-by="name"
        :preselect-first="false"
    >
      <template v-slot:selection="{ values, isOpen }">
          <span
              class="multiselect__single"
              v-if="values.length"
              v-show="!isOpen"
          >
             {{ values.length }} option{{ values.length > 1 ? 's' : '' }} sélectionnée{{ values.length > 1 ? 's' : '' }}
        </span>
      </template>
    </multiselect>
    <div v-for="(selectedValue, index) in selectedValues" :key="index">
      <ul>
        <li>{{ selectedValue.name }}</li>
      </ul>
    </div>
    <div style="color: #ef4444; font-style: italic; font-size: 12px" v-if="isOnError">
      {{ errors[name] }}
    </div>
  </div>
</template>
<script>
import Multiselect from "vue-multiselect"

export default {
  components: {Multiselect},
  props: {
    options: {
      type: Array,
      required: true,
    },
    name: {
      type: String,
      default: "name",
    },
    errors: {
      type: Object,
      default: () => {
      },
    },
  },
  data() {
    return {
      selectedValues: [],
    }
  },
  watch: {
    selectedValues: function (newValues) {
      this.$emit("options-selected", newValues.map(value => value.id));
    },
  },
  computed: {
    isOnError() {
      return this.errors === undefined
          ? false
          : this.errors[this.name] !== undefined
    },
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.css" />
