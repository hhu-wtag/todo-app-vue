<template>
  <div id="app">
    <router-view :todos="todos" @add-todo="onAdd"></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todos: [],
    }
  },

  methods: {
    onAdd(newTodo) {
      this.todos.push(newTodo)
    },
  },
}
</script>

<style lang="scss"></style>
