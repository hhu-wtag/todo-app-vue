<template>
  <div id="app" class="container">
    <InputBox identifier="initalInput" :value="todoTitle" v-model="todoTitle" />

    <TodoButton @handler="onAddTodo">Add</TodoButton>

    <div class="container__todo">
      <div v-for="todo of todos" :key="todo.id" class="container__todo-item">
        <TodoComp
          :todo="todo"
          @onDone="onDone"
          @onDelete="onDelete"
          @onUpdate="onUpdate"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue"
import InputBox from "./components/InputBox.vue"
import TodoButton from "./components/TodoButton.vue"
import TodoComp from "./components/TodoComp.vue"

export default {
  components: { InputBox, TodoButton, TodoComp },
  data: function () {
    return {
      todoTitle: null,
      todos: [],
    }
  },

  methods: {
    onAddTodo() {
      if (this.todoTitle === "" || this.todoTitle === null) return

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
      console.log(id)

      let index = this.todos.findIndex((todo) => todo.id === id)

      Vue.set(this.todos, index, {
        ...this.todos[index],
        title: editText,
      })
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
}

.darkMode {
  background: black;
  color: white;
}
</style>
