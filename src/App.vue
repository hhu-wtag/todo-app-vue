<template>
  <div id="app" class="container">
    <div class="container__input">
      <InputBox identifier="initalInput" v-model.trim="todoTitle" />
      <p>{{ errorMessage }}</p>
    </div>

    <TodoButton @click="onAdd">Add</TodoButton>

    <div class="container__todo">
      <div v-for="todo of todos" :key="todo.id" class="container__todo-item">
        <TodoComp :todo="todo" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import InputBox from "./components/InputBox"
import TodoButton from "./components/TodoButton"
import TodoComp from "./components/TodoComp"

export default {
  components: { InputBox, TodoButton, TodoComp },
  data: function () {
    return {
      todoTitle: null,
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

      this.$store.dispatch("addAction", this.todoTitle)

      this.todoTitle = null
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
    ...mapGetters({
      todos: "getTodos",
    }),
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
}

.darkMode {
  background: black;
  color: white;
}
</style>
