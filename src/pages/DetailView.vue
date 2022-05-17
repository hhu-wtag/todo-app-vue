<template>
  <div class="todo__detailWrapper">
    <ModalDialogue
      v-if="showModal"
      @confirm="onDelete"
      @cancel="onModalCancel"
    />
    <p v-if="noItem">No Item Found.</p>

    <SpinnerIcon v-if="showSpinner" />

    <TodoItem
      v-if="showTodoItemComponent"
      :todo="todoItem"
      :inDetailMode="true"
      class="card detailedView"
      @delete="onTodoDelete"
    />
  </div>
</template>

<script>
import TodoItem from "@/components/TodoItem"
import ModalDialogue from "@/components/ModalDialogue"
import { mapGetters } from "vuex"
import SpinnerIcon from "@/components/icons/SpinnerIcon.vue"
export default {
  components: { TodoItem, ModalDialogue, SpinnerIcon },

  data() {
    return {
      todoItem: null,
      noItem: false,
      showModal: false,
      showSpinner: false,
    }
  },
  watch: {
    "$store.state.todos": function () {
      this.fetchTodo()
    },
  },
  computed: {
    ...mapGetters(["getTodo"]),

    todo() {
      return this.getTodo(this.$route.params.id)
    },

    showTodoItemComponent() {
      return !this.noItem && this.todoItem !== null
    },
  },
  mounted() {
    this.fetchTodo()
  },
  methods: {
    onModalCancel() {
      this.showModal = false
    },
    onDelete() {
      this.showModal = false

      this.$store.dispatch("removeTodoItem", { id: this.todoItem.id })

      this.$router.replace("/")
    },
    onTodoDelete() {
      this.showModal = true
    },
    async fetchTodo() {
      this.showSpinner = true
      let response = await this.$store.dispatch("getTodo", {
        id: this.$route.params.id,
      })

      this.todoItem = response
      this.showSpinner = false
    },
  },
}
</script>

<style lang="scss">
.detailedView {
  width: 100% !important;

  padding: 5rem 10rem;
}

.todo__detailWrapper {
  display: flex;
  justify-content: center;
  padding: 80px;
}
</style>
