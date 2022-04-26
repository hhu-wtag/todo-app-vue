<template>
  <div>
    <ModalDialogue
      v-if="showModal"
      @confirm="onDelete"
      @cancel="onModalCancel"
    />
    <p v-if="noItem">No Item Found.</p>

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
export default {
  components: { TodoItem, ModalDialogue },

  data() {
    return {
      todoItem: null,
      noItem: false,
      showModal: false,
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
      let response = await this.$store.dispatch("getTodo", {
        id: this.$route.params.id,
      })

      this.todoItem = response
    },
  },
}
</script>

<style lang="scss">
.detailedView {
  width: 100% !important;
  height: 80vh;
  padding: 5rem 10rem;
  align-items: center;
}
</style>
