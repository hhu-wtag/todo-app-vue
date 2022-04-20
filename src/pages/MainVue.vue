<template>
  <div class="todoApp">
    <div class="todoApp__header">Header</div>
    <div class="todoApp__main">
      <p>Add Tasks</p>
      <div class="todoApp__button">
        <button class="todoApp__button_createButton" @click="onCreate">
          Create
        </button>

        <div class="todoApp__button_filterButton">
          <button class="todoApp__button_filterButton-all">All</button>
          <button class="todoApp__button_filterButton-incomplete">
            Incomplete
          </button>
          <button class="todoApp__button_filterButton-complete">
            Complete
          </button>
        </div>
      </div>

      <div class="todoApp__list">
        <CreateTodoVue
          v-if="showCreateTodo"
          :todoTitle="todoTitle"
          :todoDesc="todoDesc"
          :isTitleError="isTitleError"
          :isDescError="isDescError"
          @title-input="onTitleInput"
          @desc-input="onDescInput"
          @add="onAdd"
          @cancel="onCancel"
        />

        <TodoComp
          v-for="todo of todos"
          :key="todo.id"
          class="card"
          :todo="todo"
          :inDetailedMode="false"
          @done="onDone"
          @delete="onDelete"
          @update="onUpdate"
        />
      </div>
    </div>

    <!-- <div class="todoApp__footer">
      <button class="todoApp__footer_loadMore">Load More</button>
    </div> -->
  </div>
</template>

<script>
import Vue from "vue"

import TodoComp from "../components/TodoComp"
import CreateTodoVue from "../components/CreateTodo.vue"

export default {
  components: { TodoComp, CreateTodoVue },
  data: function () {
    return {
      todoTitle: null,
      todoDesc: null,
      todos: [],
      isTitleError: false,
      isDescError: false,
      showCreateTodo: false,
    }
  },

  created() {
    this.todos = [...this.$attrs.todos]
  },

  methods: {
    onAdd() {
      if (!this.todoTitle) {
        console.log("here")
        this.isTitleError = true
        return
      }

      if (!this.todoDesc) {
        this.onError("Can't add empty description.")
        this.isDescError = true
        return
      }

      let newTodo = {
        title: this.todoTitle,
        desc: this.todoDesc,
        id: Date.now(),
        done: false,
      }

      this.todos.push(newTodo)

      this.$emit("update", this.todos)

      this.todoTitle = null
      this.todoDesc = null
      this.isTitleError = null
      this.isDescError = null

      this.showCreateTodo = false
    },

    onDone(id) {
      let index = this.todos.findIndex((todo) => todo.id === id)

      Vue.set(this.todos, index, {
        ...this.todos[index],
        done: true,
      })

      this.$emit("update", this.todos)
    },

    onDelete(id) {
      this.todos = this.todos.filter((item) => item.id !== id)

      this.$emit("on-update", this.todos)
    },

    onUpdate(id, editText) {
      let index = this.todos.findIndex((todo) => todo.id === id)

      Vue.set(this.todos, index, {
        ...this.todos[index],
        title: editText,
      })

      this.$emit("update", this.todos)
    },

    onError() {},

    onCreate() {
      this.showCreateTodo = true
    },

    onCancel() {
      this.showCreateTodo = false
      this.todoTitle = null
      this.todoDesc = null
      this.isTitleError = null
      this.isDescError = null
    },

    onTitleInput(val) {
      this.todoTitle = val
    },

    onDescInput(val) {
      this.todoDesc = val
    },
  },
}
</script>

<style lang="scss">
.todoApp {
  display: flex;
  flex-direction: column;
}

.todoApp__main {
  padding: 0rem 10rem;
}
.todoApp__button {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.todoApp__list {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.todoApp__list > :not(:nth-child(4n)) {
  margin-right: $gap;
}

.todoApp__list > * {
  margin-bottom: $gap;
}
</style>
