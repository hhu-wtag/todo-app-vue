<template>
  <div class="modal__container">
    <div class="modal__overlay"></div>
    <div class="modal__main">
      <p>Are You Sure?</p>

      <div class="modal__main_button">
        <button class="modal__main_button-primary btn" @click="onConfirm">
          Confirm
        </button>
        <button class="modal__main_button-secondary btn" @click="onCancel">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onConfirm() {
      this.$emit("confirm")
    },

    onCancel() {
      this.$emit("cancel")
    },
  },
}
</script>

<style lang="scss">
.modal__container {
  position: relative;
  display: grid;
  place-items: center;
}

.modal__overlay {
  position: fixed;
  opacity: 0.5;
  top: 0;
  background-color: $text-secondary;
  height: 100vh;
  width: 100vw;
}

.modal__main {
  position: absolute;
  top: 2rem;
  border: 1px solid $border-primary;
  border-radius: 5px;
  padding: 2rem 4rem;
  background: $bg-secondary;
}

.modal__main_button {
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;

  &-primary,
  &-secondary {
    background-color: $bg-secondary;
    border: 1px solid $border-primary;
    padding: 4px 8px;
  }

  &-primary {
    background-color: rgb(225, 29, 72);
    color: white;
  }

  &-secondary {
  }
}
</style>
