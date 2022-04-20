<template>
  <div>
    <TodoButton v-if="!todo.done" @click="onDone">Done</TodoButton>
    <TodoButton @click="onDelete">Delete</TodoButton>

    <TodoButton
      v-if="!isEditing && !todo.done && inDetailedMode"
      @click="onEdit"
      >Edit</TodoButton
    >

    <TodoButton v-if="isEditing && !todo.done" @click="onUpdate"
      >Update</TodoButton
    >

    <TodoButton v-if="isEditing && !todo.done" @click="onCancel"
      >Cancel</TodoButton
    >
  </div>
</template>

<script>
import TodoButton from "./TodoButton"
export default {
  props: {
    todo: {
      type: Object,
    },
    identifier: {
      type: String,
    },
    isEditing: {
      type: Boolean,
    },

    inDetailedMode: {
      type: Boolean,
    },
  },
  components: {
    TodoButton,
  },
  methods: {
    onDone() {
      this.$emit("done", this.todo.id)
    },
    onDelete() {
      this.$emit("delete", this.todo.id)
    },
    onEdit() {
      this.$emit("edit", this.todo.id)
    },
    onUpdate() {
      this.$emit("update", this.todo.id)
    },
    onCancel() {
      this.$emit("cancel", this.todo.id)
    },
  },
}
</script>

<style></style>
