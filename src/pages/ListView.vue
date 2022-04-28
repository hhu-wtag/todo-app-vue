<template>
  <div class="todoApp">
    <ModalDialogue
      v-if="showModal"
      @confirm="onDelete"
      @cancel="onModalCancel"
    />
    <div class="todoApp__main">
      <EmptyStateIcon v-if="showEmptyState" class="todoApp__main_emptyState" />
      <SpinnerIcon v-if="showSpinner" class="spinner__listView" />
      <p class="todoApp__main_title">Add Tasks</p>

      <div class="todoApp__toastList">
        <transition-group name="list">
          <ToastBar v-for="toast in toasts" :toast="toast" :key="toast.id" />
        </transition-group>
      </div>

      <div class="todoApp__header" :class="{ disabled: showSpinner }">
        <div class="todoApp__button">
          <button class="todoApp__button_createButton btn" @click="onCreate">
            Create
          </button>

          <div class="todoApp__button_filterButton">
            <button
              class="todoApp__button_filterButton-all btn"
              :class="{
                activeFilter: activeFilter === 'all' && !disableFilterButton,
              }"
              @click="onAll"
              :disabled="disableFilterButton"
            >
              All
            </button>
            <button
              class="todoApp__button_filterButton-incomplete btn"
              :class="{
                activeFilter: activeFilter === 'inc' && !disableFilterButton,
              }"
              @click="onInComplete"
              :disabled="disableFilterButton"
            >
              Incomplete
            </button>
            <button
              class="todoApp__button_filterButton-complete btn"
              :class="{
                activeFilter: activeFilter === 'com' && !disableFilterButton,
              }"
              @click="onComplete"
              :disabled="disableFilterButton"
            >
              Complete
            </button>
          </div>
        </div>

        <div class="todoApp__list">
          <CreateTodo
            v-if="showCreateTodo"
            @cancel="onCancel"
            @add="renderAll"
          />

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

    <div class="todoApp__footer">
      <button
        v-if="activeLoadMore"
        class="btn todoApp__footer_loadMore"
        @click="onLoadMore"
      >
        Load More
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import TodoItem from "../components/TodoItem"
import CreateTodo from "../components/CreateTodo"
import ModalDialogue from "@/components/ModalDialogue"
import EmptyStateIcon from "../components/icons/EmptyStateIcon"
import SpinnerIcon from "@/components/icons/SpinnerIcon"
import ToastBar from "@/components/ToastBar"
import { SET_FILTER, RESET_LIMIT } from "@/stores/mutation-types"
import { ALL, INCOMPLETE, COMPLETE } from "@/utils/constants"

export default {
  components: {
    TodoItem,
    CreateTodo,
    ModalDialogue,
    EmptyStateIcon,
    SpinnerIcon,
    ToastBar,
  },
  data: function () {
    return {
      todoTitle: null,
      todoDesc: null,
      todos: [],
      showCreateTodo: false,
      showModal: false,
      todoItemToBeDeleted: null,
      showLoader: false,
      allTodoLen: 0,
      comTodoLen: 0,
      incTodoLen: 0,
    }
  },
  computed: {
    ...mapGetters({
      allTodos: "getTodos",
      toasts: "getToasts",
    }),

    showEmptyState: function () {
      return this.todos.length === 0 && !this.showCreateTodo
    },

    showSpinner() {
      return (
        this.showLoader ||
        (this.$store.state.isSearching && !this.showEmptyState)
      )
    },

    disableFilterButton: function () {
      return (
        this.allTodoLen === 0 && this.incTodoLen === 0 && this.comTodoLen === 0
      )
    },

    activeFilter: function () {
      return this.$store.state.currentFilter
    },

    activeLoadMore: function () {
      let { currentFilter, limit } = this.$store.state

      if (currentFilter === ALL) {
        return this.allTodoLen > limit
      } else if (currentFilter === INCOMPLETE) {
        return this.incTodoLen > limit
      } else {
        return this.comTodoLen > limit
      }
    },
  },
  created() {
    this.todos = [...this.fetchAndFilter()]
  },
  watch: {
    allTodos: function () {
      this.todos = [...this.fetchAndFilter()]
    },

    activeFilter: function () {
      this.todos = [...this.fetchAndFilter()]
    },
  },
  methods: {
    fetchAndFilter() {
      let { currentFilter, limit } = this.$store.state

      let response = [...this.allTodos]

      let incFilteredTodos = response.filter((todo) => !todo.done)
      let comFilteredTodos = response.filter((todo) => todo.done)

      this.allTodoLen = response.length
      this.incTodoLen = incFilteredTodos.length
      this.comTodoLen = comFilteredTodos.length

      if (currentFilter === ALL) {
        return response.slice(0, limit)
      } else if (currentFilter === COMPLETE) {
        response = comFilteredTodos
      } else {
        response = incFilteredTodos
      }

      return response.slice(0, limit)
    },
    onDelete() {
      this.showModal = false

      this.$store.dispatch("removeTodoItem", this.todoItemToBeDeleted)
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
      this.$store.commit(RESET_LIMIT)
      this.$store.commit(SET_FILTER, {
        filter: ALL,
      })

      this.fetchAndFilter()
    },
    onComplete() {
      this.$store.commit(SET_FILTER, {
        filter: COMPLETE,
      })

      this.fetchAndFilter()
    },
    onInComplete() {
      this.$store.commit(SET_FILTER, {
        filter: INCOMPLETE,
      })

      this.fetchAndFilter()
    },
    renderAll() {
      this.todos = this.allTodos
    },
    onLoadMore() {
      this.$store.dispatch("setTodoLimit")
      this.todos = [...this.fetchAndFilter()]
    },
  },
}
</script>

<style lang="scss">
.todoApp {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: $bg-primary;
}

.todoApp__main {
  padding: 65px 150px;

  &_emptyState {
    position: fixed;
    left: calc(50% - 100px);
    top: calc(40%);
  }

  &_title {
    font-size: 30px;
    font-weight: 700;
    color: $text-primary;
    margin-bottom: 28px;
  }
}

.todoApp__toastList {
  position: fixed;
  display: flex;
  flex-direction: column;
  z-index: 999;

  top: 15%;
  left: 50%;
  transform: translateX(-50%);
}

.spinner__listView {
  position: fixed;
  top: 40%;
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
  border-bottom: 3px solid $border-primary !important;
}

.todoApp__list {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  z-index: 10;
}

.todoApp__list > :not(:nth-child(4n)) {
  margin-right: $gap;
}

.todoApp__list > * {
  margin-bottom: $gap;
}

.todoApp__footer {
  display: flex;
  justify-content: center;
  background-color: $bg-primary;
  width: 100%;

  &_loadMore {
    padding: 8px 18px;
    border: 1px solid $border-primary;
    background-color: $text-primary;
    color: white;
    font-weight: bold;
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
