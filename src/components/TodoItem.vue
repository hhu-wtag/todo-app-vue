<template>
  <div class="todo">
    <div class="todo__header">
      <div v-if="!isEditing">
        <router-link v-if="!inDetailedMode" :to="`/details/${todo.id}`">
          <h1 class="todo__header_title" :class="{ done: todo.done }">
            {{ todo.title }}
          </h1>
        </router-link>

        <h1 v-else>
          <span>Title: </span>{{ todoDetails && todoDetails.title }}
        </h1>

        <p class="todo__header_desc" v-if="!inDetailedMode">
          <span>Description: </span>{{ todo.desc }}
        </p>

        <p class="todo__header_desc" v-else>
          <span>Description: </span>{{ todoDetails && todoDetails.desc }}
        </p>
      </div>
      <CreateTodo
        v-else
        :inDetailedMode="inDetailedMode"
        :id="todo.id"
        @edit-update="onEditUpdate"
        :class="{ createTodo__detailed: inDetailedMode }"
      />
    </div>
    <div class="todo__footer">
      <ActionButtons
        identifier="todoButtons"
        :todo="todo"
        :isEditing="isEditing"
        :inDetailedMode="inDetailedMode"
        @done="onDone"
        @delete="onDelete"
        @edit="onEdit"
        @cancel="onCancel"
      />
    </div>
  </div>
</template>

<script>
import ActionButtons from "./ActionButtons"
import CreateTodo from "./CreateTodo.vue"

export default {
  props: {
    todo: {
      type: Object,
      required: true,
    },
    inDetailedMode: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    ActionButtons,
    CreateTodo,
  },

  data() {
    return {
      editText: null,
      isEditing: false,
      todoDetails: null,
    }
  },

  created() {
    if (this.inDetailedMode) {
      this.todoDetails = this.todo
    }
  },

  methods: {
    onDone() {
      this.isEditing = false
      this.isDone = true

      this.$store.dispatch("setTodoDone", { id: this.todo.id })

      if (this.inDetailedMode) {
        this.$router.replace("/")
      }
    },
    onDelete() {
      this.$emit("delete", { id: this.todo.id })
    },
    onEdit() {
      this.isEditing = true
      this.editText = this.todo.title
    },

    onCancel() {
      this.isEditing = false
      this.editText = null
    },

    onEditUpdate(title, desc) {
      this.$store.dispatch("setTodoUpdate", {
        id: this.todo.id,
        editedTitle: title,
        editedDesc: desc,
      })

      this.isEditing = false

      let response = this.$store.getters.getTodo(this.todo.id)

      if (response.status === "ok") {
        this.todoDetails = { ...response.todo }
      }

      // this.$router.replace("/")
    },
  },
}
</script>

<style lang="scss">
.done {
  color: $text-success;
  text-decoration: line-through;
}

.todo {
  justify-content: space-between;
}

.todo__header {
  margin-bottom: 24px;

  &_title {
    font-size: 24px;
  }

  &_desc {
    font-size: 14px;
    color: $text-secondary;
  }
}

.createTodo__detailed {
  width: 100% !important;
  align-items: center;
}
</style>
