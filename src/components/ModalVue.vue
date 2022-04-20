<template>
  <div class="modal__container">
    <div class="modal__overlay"></div>
    <div class="modal__main">
      <p>Are You Sure?</p>

      <div class="modal__main_button">
        <button class="modal__main_button-primary btn" @click="$emit('yes')">
          Yes
        </button>
        <button class="modal__main_button-secondary btn" @click="$emit('no')">
          No
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.modal__container {
  position: relative;
  display: grid;
  place-items: center;
}

.modal__overlay {
  position: absolute;
  opacity: 0.5;
  top: 0;
  background-color: $text-secondary;
  height: 90vh;
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
