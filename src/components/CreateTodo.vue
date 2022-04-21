<template>
  <div class="createTodo card">
    <div class="createTodo__inputBox">
      <label for="createTodo__inputBox_titleLabel">Title</label>
      <input
        type="text"
        class="createTodo__inputBox_titleInput"
        v-model.trim="title"
      />
      <span v-show="isTitleError">Title is required.</span>

      <label for="createTodo__inputBox_descLabel">Description</label>
      <textarea
        class="createTodo__inputBox_descInput"
        v-model.trim="description"
      />
      <span v-show="isDescError">Description is required.</span>
    </div>

    <div class="createTodo__button">
      <button class="createTodo__button_add btn" @click="onAdd">Add</button>
      <div class="createTodo__button_cancel btn" @click="onCancel">
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

  data() {
    return {
      title: null,
      description: null,
      isTitleError: false,
      isDescError: false,
    }
  },

  methods: {
    onAdd() {
      if (!this.title) {
        this.isTitleError = true
        return
      }

      if (!this.description) {
        this.isDescError = true
        return
      }

      this.$store.dispatch("addAction", {
        title: this.title,
        desc: this.description,
      })

      this.onCancel()
    },

    onCancel() {
      this.$emit("cancel")
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
