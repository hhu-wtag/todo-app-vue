<template>
  <div class="todo" :class="{ disabled: showSpinner }">
    <SpinnerIcon v-if="showSpinner" />

    <div class="todo__header">
      <div v-if="!isEditing">
        <router-link v-if="!inDetailMode" :to="`/details/${todo.id}`">
          <h1 class="todo__header_title" :class="{ done: isDone }">
            {{ todo.title }}
          </h1>
        </router-link>

        <h1 class="todo__header_title" v-else>
          <span>Title: </span>{{ todo && todo.title }}
        </h1>

        <p class="todo__header_desc" v-if="!inDetailMode">
          {{ todo.desc }}
        </p>

        <p class="todo__header_desc" v-else>
          <span>Description: </span>{{ todo && todo.desc }}
        </p>
      </div>
      <CreateTodo
        v-else
        :inDetailMode="inDetailMode"
        :todoItem="todo"
        :id="todo.id"
        @update="onEditUpdate"
        :class="{ createTodo__detailed: inDetailMode }"
      />
    </div>
    <div class="todo__footer">
      <ActionButtons
        identifier="todoButtons"
        :todo="todo"
        :isEditing="isEditing"
        :inDetailMode="inDetailMode"
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
import CreateTodo from "./CreateTodo"
import SpinnerIcon from "./icons/SpinnerIcon"

export default {
  props: {
    todo: {
      type: Object,
      required: true,
    },
    inDetailMode: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    ActionButtons,
    CreateTodo,
    SpinnerIcon,
  },
  data() {
    return {
      editText: null,
      isEditing: false,
      todoDetails: null,
      showSpinner: false,
    }
  },
  computed: {
    isDone() {
      return this.todo?.done
    },
  },
  methods: {
    async onDone() {
      this.isEditing = false
      this.showSpinner = true

      try {
        await this.$store.dispatch("setTodoDone", { id: this.todo.id })
      } catch (error) {
        throw new Error(error)
      } finally {
        this.showSpinner = false
        if (this.inDetailMode) {
          this.$router.replace("/")
        }
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
    async onEditUpdate(title, desc) {
      this.showSpinner = true

      try {
        await this.$store.dispatch("setTodoUpdate", {
          id: this.todo.id,
          editedTitle: title,
          editedDesc: desc,
        })
      } catch (error) {
        throw new Error(error)
      } finally {
        this.showSpinner = false
        this.isEditing = false
      }
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
  position: relative;
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
