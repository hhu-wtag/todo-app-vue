<template>
  <div>
    <ModalDialogue
      v-if="showModal"
      @confirm="onDelete"
      @cancel="onModalCancel"
    />
    <p v-if="noItem">No Item Found.</p>

    <TodoItem
      v-if="!noItem && todoItem !== null"
      :todo="todoItem"
      :inDetailMode="true"
      class="card detailedView"
      @delete="onTodoDelete"
    />

    <div class="detail__goback">
      <router-link to="/">Go Back</router-link>
    </div>
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
  },
  created() {
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
      // const { status, todo } = this.todo

      // if (status === "ok") {
      //   this.todoItem = todo
      // } else {
      //   this.noItem = true
      // }

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

.detail__goback {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 1rem;

  & > a {
    background: $text-primary;
    color: white;
    padding: 8px 12px;
    border-radius: 5px;
  }
  & > a:hover {
    background: #232323;
  }
}
</style>
