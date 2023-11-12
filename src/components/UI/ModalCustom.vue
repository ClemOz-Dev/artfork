<template>
  <div class="fixed inset-0 flex items-center justify-center z-50 m-5">
    <div
      class="modal-overlay fixed inset-0 bg-gray-800 opacity-70"
      @click="closeModal"
    ></div>
    <div
      class="modal-container bg-white rounded shadow-lg z-50 overflow-y-auto p-4"
    >
      <div class="modal-content text-left">
        <div class="modal-header">
          <h3 class="text-lg font-semibold">{{ title }}</h3>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalCustom",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  methods: {
    closeModal() {
      this.$emit("close")
    },
  },
}
</script>
<style lang="scss" scoped>
.confirm {
  background-color: #ef4444;
  &:hover {
    background-color: #f52424;
  }
}

.modal-container {
  max-height: 100%;
  overflow-y: auto;
}
.modal-content {
  .modal-header {
    padding: 12px;

    h3 {
      font-size: 24px;
    }
  }
}
</style>
