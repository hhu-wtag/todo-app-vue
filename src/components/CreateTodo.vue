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
      <span v-show="isTitleError">Title is required.</span>

      <label for="createTodo__inputBox_descLabel">Description</label>
      <textarea
        class="createTodo__inputBox_descInput"
        :value="todoDesc"
        @input="$emit('desc-input', $event.target.value)"
      />
      <span v-show="isDescError">Description is required.</span>
    </div>

    <div class="createTodo__button">
      <button class="createTodo__button_add btn" @click="$emit('add')">
        Add
      </button>
      <div class="createTodo__button_cancel btn" @click="$emit('cancel')">
        <DeleteIcon />
      </div>
    </div>
  </div>
</template>

<script>
import DeleteIcon from "@/components/icons/DeleteIcon"

export default {
  components: {
    DeleteIcon,
  },
  props: {
    todoTitle: {
      type: String,
      required: true,
    },
    todoDesc: {
      type: String,
      required: true,
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
.createTodo__inputBox_descInput {
  resize: none;
  height: 5rem;
}

.createTodo__inputBox {
  display: flex;
  flex-direction: column;

  &_descInput,
  &_titleInput {
    margin-bottom: 12px;
    border: 3px solid $border-primary;
    border-radius: 5px;
  }
}

.createTodo__button > button {
  font-size: 12px;
  padding: 8px 12px;
  border: 1px solid #d1d8ff;
  background-color: $bg-secondary;
}

.createTodo__button {
  display: flex;
  align-items: center;

  &_cancel {
    margin-left: 18px;
  }
}
</style>
