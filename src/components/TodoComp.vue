<template>
  <div>
    <TodoTitle v-if="!isEditing" :done="todo.done" :title="todo.title" />

    <InputBox
      v-if="isEditing"
      identifier="initalInput"
      :value="editText"
      v-model="editText"
    />

    <ActionButtons
      identifier="todoButtons"
      :todo="todo"
      :isEditing="isEditing"
      @done="onDone"
      @delete="onDelete"
      @edit="onEdit"
      @update="onUpdate"
      @cancel="onCancel"
    />
  </div>
</template>

<script>
import TodoTitle from "./TodoTitle"
import ActionButtons from "./ActionButtons"
import InputBox from "./InputBox"

export default {
  props: {
    todo: {
      type: Object,
    },
  },
  components: {
    TodoTitle,
    ActionButtons,
    InputBox,
  },

  data() {
    return {
      editText: null,
      isEditing: false,
    }
  },

  methods: {
    onDone() {
      this.isEditing = false

      this.$store.dispatch("setTodoDone", this.todo.id)
    },
    onDelete() {
      this.$store.dispatch("removeTodoItem", this.todo.id)
    },
    onEdit() {
      this.isEditing = true
      this.editText = this.todo.title
    },
    onUpdate() {
      this.isEditing = false
      if (!this.editText || this.editText === this.todo.title) {
        return
      }

      this.$store.dispatch("setTodoUpdate", this.todo.id, this.editText)
    },
    onCancel() {
      this.isEditing = false
      this.editText = null
    },
  },
}
</script>

<style></style>
