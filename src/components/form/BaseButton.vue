<template>
  <button
    :class="[isDisabled ? 'base-button-disabled' : type]"
    :disabled="isDisabled"
    class="button"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    type: {
      type: String,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  height: 56px;
  border-radius: 16px;
  text-align: center;
  font-weight: bold;
  padding: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  color: white;
  background-color: #ef4444;
  border: 3px solid #ef4444;
  font-size: 16px;

  &:disabled {
    background-color: lightgrey;
    border-color: lightgrey;
    color: grey;
    cursor: default;
  }
}


</style>
