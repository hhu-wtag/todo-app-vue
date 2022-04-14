<template>
  <div id="app" class="container">
    <div class="container__input">
      <InputBox identifier="initalInput" v-model.trim="todoTitle" />
      <p>{{ errorMessage }}</p>
    </div>

    <TodoButton @click="onAdd">Add</TodoButton>

    <div class="container__todo">
      <div v-for="todo of todos" :key="todo.id" class="container__todo-item">
        <TodoComp
          :todo="todo"
          @done="onDone"
          @delete="onDelete"
          @update="onUpdate"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue"
import InputBox from "./components/InputBox"
import TodoButton from "./components/TodoButton"
import TodoComp from "./components/TodoComp"

export default {
  components: { InputBox, TodoButton, TodoComp },
  data: function () {
    return {
      todoTitle: null,
      todos: [],
      errorMessage: null,
      isError: false,
    }
  },

  methods: {
    onAdd() {
      if (!this.todoTitle) {
        console.log("Can't add empty string")
        this.onError("Can't add empty string.")
        return
      }

      let newTodo = {
        title: this.todoTitle,
        id: Date.now(),
        done: false,
      }

      this.todos.push(newTodo)

      this.todoTitle = null
    },

    onDone(id) {
      let index = this.todos.findIndex((todo) => todo.id === id)

      Vue.set(this.todos, index, {
        ...this.todos[index],
        done: true,
        inEditState: false,
      })
    },

    onDelete(id) {
      this.todos = this.todos.filter((item) => item.id !== id)
    },

    onUpdate(id, editText) {
      let index = this.todos.findIndex((todo) => todo.id === id)

      Vue.set(this.todos, index, {
        ...this.todos[index],
        title: editText,
      })
    },

    onError(message) {
      this.isError = true
      this.errorMessage = message

      setTimeout(() => {
        this.isError = false
        this.errorMessage = null
      }, 1000)
    },
  },

  computed: {
    arrLen: function () {
      return this.todos.length
    },
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $text-primary;
  margin-top: 60px;
  background: $bg-primary;
}

.darkMode {
  background: black;
  color: white;
}
</style>
