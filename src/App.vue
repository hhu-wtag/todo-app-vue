<template>
  <div id="app" class="container">
    <InputBox
      :todoTitle="todoTitle"
      :handleAddTodo="handleAddTodo"
      :handleInput="handleInput"
      :arrLen="arrLen"
    />

    <div class="container__todo">
      <div v-for="todo of todos" :key="todo.id" class="container__todo-item">
        <TodoTitle :done="todo.done" :title="todo.title" />

        <TodoButton v-if="!todo.done" :handler="() => handleDone(todo.id)"
          >Done</TodoButton
        >
        <TodoButton :handler="() => handleDelete(todo.id)">Delete</TodoButton>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue"
import InputBox from "./components/InputBox.vue"
import TodoTitle from "./components/TodoTitle.vue"
import TodoButton from "./components/TodoButton.vue"

export default {
  components: { InputBox, TodoTitle, TodoButton },
  data: function () {
    return {
      todoTitle: "",
      todos: [],
    }
  },

  methods: {
    handleInput(e) {
      this.todoTitle = e.target.value
    },

    handleAddTodo(e) {
      e.preventDefault()

      if (this.todoTitle === "") return

      let newTodo = {
        title: this.todoTitle,
        id: Date.now(),
        done: false,
      }

      this.todos.push(newTodo)

      this.todoTitle = ""
    },

    handleDone(id) {
      let index = this.todos.findIndex((todo) => todo.id === id)

      Vue.set(this.todos, index, {
        ...this.todos[index],
        done: true,
      })
    },

    handleDelete(id) {
      this.todos = this.todos.filter((item) => item.id !== id)
    },
  },

  computed: {
    arrLen: function () {
      return this.todos.length
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.darkMode {
  background: black;
  color: white;
}
</style>
