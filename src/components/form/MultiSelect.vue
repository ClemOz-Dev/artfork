<template>
  <div class="flex mt-6 flex-col">
    <label class="typo__label">Oeuvres disponibles</label>
    <Field
      name="artworks"
      rules="required"
      :value="selectedValues"
      v-slot="{ field }"
    >
      <multiselect
        v-model="selectedValues"
        v-bind="field"
        :options="options"
        :multiple="true"
        :close-on-select="false"
        :clear-on-select="false"
        :preserve-search="true"
        label="name"
        track-by="name"
        :preselect-first="true"
      >
        <template v-slot:selection="{ values, isOpen }"
          ><span
            class="multiselect__single"
            v-if="values.length"
            v-show="!isOpen"
            >{{ values.length }} options selected</span
          ></template
        >
      </multiselect>
    </Field>
    <div v-for="(selectedValue, index) in selectedValues" :key="index">
      <ul>
        <li>{{ selectedValue.name }}</li>
      </ul>
    </div>
    <ErrorMessage :name="name" class="text-red-500 text-sm w-80" />
  </div>
</template>
<script>
import Multiselect from "vue-multiselect"
import { Field, ErrorMessage } from "vee-validate"

export default {
  components: { Multiselect, Field, ErrorMessage },
  props: {
    options: {
      type: Array,
      required: true,
    },
    isClickable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selectedValues: [],
    }
  },
  methods: {
    parseToString(value) {
      return value.map((v) => v.name).toString()
    },
  },
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
