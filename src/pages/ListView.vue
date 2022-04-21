<template>
  <div class="todoApp">
    <ModalDialogue
      v-if="showModal"
      @confirm="onDelete"
      @cancel="onModalCancel"
    />
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
        <CreateTodo v-if="showCreateTodo" @cancel="onCancel" />

        <TodoItem
          v-for="todo of todos"
          class="card"
          :key="todo.id"
          :todo="todo"
          :inDetailedMode="false"
          @delete="openModal"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue"
import { mapGetters } from "vuex"
import TodoItem from "../components/TodoItem"
import CreateTodo from "../components/CreateTodo.vue"
import ModalDialogue from "@/components/ModalDialogue.vue"

export default {
  components: { TodoItem, CreateTodo, ModalDialogue },
  data: function () {
    return {
      todoTitle: null,
      todoDesc: null,
      showCreateTodo: false,
      showModal: false,
      todoItemToBeDeleted: null,
    }
  },

  computed: {
    ...mapGetters({
      todos: "getTodos",
    }),
  },

  methods: {
    onDone(id) {
      let index = this.todos.findIndex((todo) => todo.id === id)

      Vue.set(this.todos, index, {
        ...this.todos[index],
        done: true,
      })

      this.$emit("update", this.todos)
    },

    onDelete() {
      this.showModal = false

      this.$store.dispatch("deleteAction", this.todoItemToBeDeleted)
    },

    onUpdate(id, editText) {
      let index = this.todos.findIndex((todo) => todo.id === id)

      Vue.set(this.todos, index, {
        ...this.todos[index],
        title: editText,
      })

      this.$emit("update", this.todos)
    },

    onCreate() {
      this.showCreateTodo = true
    },

    onCancel() {
      this.showCreateTodo = false
      this.todoTitle = null
      this.todoDesc = null
    },

    openModal(id) {
      this.todoItemToBeDeleted = id
      this.showModal = true
    },

    onModalCancel() {
      this.showModal = false
      this.todoItemToBeDeleted = null
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
