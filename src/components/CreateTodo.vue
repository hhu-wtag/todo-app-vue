<template>
  <div class="createTodo card">
    <div class="createTodo__inputBox">
      <label for="createTodo__inputBox_titleLabel">Title</label>
      <input
        type="text"
        class="createTodo__inputBox_titleInput"
        :value="todoTitle"
        @input="$emit('title-input', $event.target.value)"
      />
      <span v-show="isTitleError">Can't add empty title.</span>

      <label for="createTodo__inputBox_descLabel">Description</label>
      <textarea
        class="createTodo__inputBox_descInput"
        :value="todoDesc"
        @input="$emit('desc-input', $event.target.value)"
      />
      <span v-show="isDescError">Can't add empty description.</span>
    </div>

    <div class="createTodo__button">
      <button class="createTodo__button_add" @click="$emit('add')">Add</button>
      <button class="createTodo__button_cancel" @click="$emit('cancel')">
        Cancel
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    todoTitle: {
      type: String,
    },

    todoDesc: {
      type: String,
    },

    isTitleError: {
      type: Boolean,
      default: false,
    },

    isDescError: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss">
textarea {
  resize: none;
  height: 5rem;
}

.createTodo__inputBox {
  display: flex;
  flex-direction: column;
}
</style>
