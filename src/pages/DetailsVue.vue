<template>
  <div>
    <ModalDialogue
      v-if="showModal"
      @confirm="onDelete"
      @cancel="onModalCancel"
    />
    <p v-if="noItem">No Item Found.</p>

    <TodoItem
      v-else
      :todo="todoItem"
      :inDetailedMode="true"
      class="card detailedView"
      @delete="onTodoDelete"
    />

    <div class="detail__goback">
      <router-link to="/">Go Back</router-link>
    </div>
  </div>
</template>

<script>
import TodoItem from "@/components/TodoItem.vue"
import ModalDialogue from "@/components/ModalDialogue.vue"
export default {
  components: { TodoItem, ModalDialogue },

  data() {
    return {
      todoItem: null,
      noItem: false,
      showModal: false,
    }
  },

  created() {
    const response = this.$store.getters.getTodo(this.$route.params.id)

    if (response.status === "ok") {
      this.todoItem = response.todo
    } else {
      this.noItem = true
    }
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
