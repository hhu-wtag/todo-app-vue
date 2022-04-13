<template>
  <div id="app" class="container">
    <InputBox
      identifier="initalInput"
      :value="todoTitle"
      v-model="todoTitle"
      @handler="handleAddTodo"
      >Add</InputBox
    >

    <div class="container__todo">
      <div v-for="todo of todos" :key="todo.id" class="container__todo-item">
        <TodoTitle
          v-if="!todo.inEditState"
          :done="todo.done"
          :title="todo.title"
        />

        <InputBox
          v-else
          identifier="todoInput"
          :todo="todo"
          :id="todo.id"
          :value="todo.title"
          v-model="todo.title"
          @handler="handleUpdate"
          @handleCancel="handleCancel"
          >Update</InputBox
        >

        <ActionButtons
          :todo="todo"
          @handleDelete="handleDelete"
          @handleDone="handleDone"
          @handleEdit="handleEdit"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue"
import InputBox from "./components/InputBox.vue"
import TodoTitle from "./components/TodoTitle.vue"
import ActionButtons from "./components/ActionButtons.vue"

export default {
  components: { InputBox, TodoTitle, ActionButtons },
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
        inEditState: false,
      }

      this.todos.push(newTodo)

      this.todoTitle = ""
    },

    handleDone(id) {
      let index = this.todos.findIndex((todo) => todo.id === id)

      Vue.set(this.todos, index, {
        ...this.todos[index],
        done: true,
        inEditState: false,
      })
    },

    handleDelete(id) {
      this.todos = this.todos.filter((item) => item.id !== id)
    },

    handleEdit(id) {
      let index = this.todos.findIndex((todo) => todo.id === id)

      Vue.set(this.todos, index, {
        ...this.todos[index],
        inEditState: true,
      })
    },

    handleUpdate(e, id) {
      console.log(id)

      let index = this.todos.findIndex((todo) => todo.id === id)

      Vue.set(this.todos, index, {
        ...this.todos[index],
        inEditState: false,
      })
    },

    handleCancel(e, id, intialTitle) {
      let index = this.todos.findIndex((todo) => todo.id === id)

      Vue.set(this.todos, index, {
        ...this.todos[index],
        title: intialTitle,
        inEditState: false,
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
