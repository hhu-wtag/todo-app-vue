<template>
  <div>
    <TodoButton v-if="!todo.done" @handler="() => $emit('handleDone', todo.id)"
      >Done</TodoButton
    >
    <TodoButton @handler="() => $emit('handleDelete', todo.id)"
      >Delete</TodoButton
    >

    <TodoButton
      v-if="!isEditing && !todo.done"
      @handler="() => $emit('onEdit', todo.id)"
      >Edit</TodoButton
    >

    <TodoButton
      v-if="isEditing && !todo.done"
      @handler="() => $emit('onUpdate', todo.id)"
      >Update</TodoButton
    >

    <TodoButton
      v-if="isEditing && !todo.done"
      @handler="() => $emit('onCancel', todo.id)"
      >Cancel</TodoButton
    >
  </div>
</template>

<script>
import TodoButton from "./TodoButton.vue"
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
