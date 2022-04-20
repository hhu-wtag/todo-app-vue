<template>
  <div class="todoApp">
    <!-- <ModalVue /> -->
    <div class="todoApp__main">
      <p class="todoApp__main_title">Add Tasks</p>
      <div class="todoApp__button">
        <button class="todoApp__button_createButton btn" @click="onCreate">
          Create
        </button>

        <div class="todoApp__button_filterButton">
          <button class="todoApp__button_filterButton-all btn">All</button>
          <button class="todoApp__button_filterButton-incomplete btn">
            Incomplete
          </button>
          <button class="todoApp__button_filterButton-complete btn">
            Complete
          </button>
        </div>
      </div>

      <div class="todoApp__list">
        <CreateTodo
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

        <TodoItem
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

import TodoItem from "../components/TodoItem"
import CreateTodo from "../components/CreateTodo.vue"

export default {
  components: { TodoItem, CreateTodo },
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
  position: relative;
  display: flex;
  flex-direction: column;
}

.todoApp__main {
  padding: 65px 150px;

  &_title {
    font-size: 30px;
    font-weight: 700;
    color: $text-primary;
    margin-bottom: 28px;
  }
}
.todoApp__button {
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 34px;

  &_createButton {
    background: $text-accent;
    color: $bg-secondary;
    padding: 8px 12px;
    border: 1px solid #d1d8ff;
    border-radius: 5px;
  }

  &_filterButton > button {
    padding: 8px 12px;
    border: 1px solid #d1d8ff;
    border-radius: 5px;
    background-color: $bg-secondary;
  }

  &_filterButton > button + button {
    margin-left: 20px;
  }
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
