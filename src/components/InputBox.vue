<template>
  <form>
    <p>Total Number of Todos: {{ arrLen }}</p>
    <input
      type="text"
      @input="handleInput"
      :value="todoTitle"
      name="todoInput"
      id="todoInput"
    />

    <button type="click" @click="handleAddTodo">Add Todo</button>
  </form>
</template>

<script>
export default {
  props: ["todoTitle", "handleAddTodo", "arrLen", "handleInput"],
  data: function () {
    return {
      title: this.$props.todoTitle,
    }
  },
}
</script>
