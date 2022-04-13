<template>
  <div>
    <TodoButton v-if="!todo.done" @handler="() => $emit('handleDone', todo.id)"
      >Done</TodoButton
    >
    <TodoButton @handler="() => $emit('handleDelete', todo.id)"
      >Delete</TodoButton
    >

    <TodoButton
      v-if="!todo.inEditState && !todo.done"
      @handler="() => $emit('handleEdit', todo.id)"
      >Edit</TodoButton
    >
  </div>
</template>

<script>
import TodoButton from "./TodoButton.vue"
export default {
  props: ["todo"],
  components: {
    TodoButton,
  },
}
</script>

<style></style>
