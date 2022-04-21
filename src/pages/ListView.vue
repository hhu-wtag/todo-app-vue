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
          <button
            class="todoApp__button_filterButton-all btn"
            :class="{ activeFilter: activeFilter === 'all' }"
            @click="onAll"
          >
            All
          </button>
          <button
            class="todoApp__button_filterButton-incomplete btn"
            :class="{ activeFilter: activeFilter === 'inc' }"
            @click="onInComplete"
          >
            Incomplete
          </button>
          <button
            class="todoApp__button_filterButton-complete btn"
            :class="{ activeFilter: activeFilter === 'com' }"
            @click="onComplete"
          >
            Complete
          </button>
        </div>
      </div>

      <div class="todoApp__list">
        <CreateTodo v-if="showCreateTodo" @cancel="onCancel" @add="renderAll" />

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
      todos: [],
      showCreateTodo: false,
      showModal: false,
      todoItemToBeDeleted: null,
      activeFilter: "all",
    }
  },

  computed: {
    ...mapGetters({
      allTodos: "getTodos",
    }),
  },

  created() {
    this.todos = [...this.allTodos]
  },

  watch: {
    allTodos: function () {
      this.todos = [...this.allTodos]
    },
  },

  methods: {
    onDelete() {
      this.showModal = false

      this.$store.dispatch("deleteAction", this.todoItemToBeDeleted)
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

    onAll() {
      this.activeFilter = "all"
      this.todos = [...this.$store.getters.filterTodos("all")]
    },

    onComplete() {
      this.activeFilter = "com"
      this.todos = [...this.$store.getters.filterTodos("com")]
    },

    onInComplete() {
      this.activeFilter = "inc"
      this.todos = [...this.$store.getters.filterTodos("inc")]
    },

    renderAll() {
      this.activeFilter = "all"
      this.todos = this.allTodos
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

.activeFilter {
  color: $text-accent;
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
