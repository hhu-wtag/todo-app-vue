<template>
  <div>
    <TodoButton v-if="!todo.done" @click="() => $emit('onDone', todo.id)"
      >Done</TodoButton
    >
    <TodoButton @click="() => $emit('onDelete', todo.id)">Delete</TodoButton>

    <TodoButton
      v-if="!isEditing && !todo.done"
      @click="() => $emit('onEdit', todo.id)"
      >Edit</TodoButton
    >

    <TodoButton
      v-if="isEditing && !todo.done"
      @click="() => $emit('onUpdate', todo.id)"
      >Update</TodoButton
    >

    <TodoButton
      v-if="isEditing && !todo.done"
      @click="() => $emit('onCancel', todo.id)"
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
  },
  components: {
    TodoButton,
  },
}
</script>

<style></style>
