<template>
  <div class="todo">
    <div class="todo__header">
      <router-link :to="`/details/${todo.id}/${JSON.stringify(todo)}`">
        <h1
          v-if="!isEditing"
          class="todo__header_title"
          :class="{ done: isDone }"
        >
          {{ todo.title }}
        </h1>
      </router-link>

      <p class="todo__header_desc">{{ todo.desc }}</p>

      <InputBox
        v-if="isEditing"
        identifier="initalInput"
        :value="editText"
        v-model.trim="editText"
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
        @update="onUpdate"
        @cancel="onCancel"
      />
    </div>
  </div>
</template>

<script>
import ActionButtons from "./ActionButtons"

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
  },

  data() {
    return {
      editText: null,
      isEditing: false,
      isDone: false,
    }
  },

  methods: {
    onDone() {
      this.isEditing = false
      this.isDone = true
      this.$emit("done", this.todo.id)
    },
    onDelete() {
      this.$emit("delete", this.todo.id)
    },
    onEdit() {
      this.isEditing = true
      this.editText = this.todo.title
    },
    onUpdate() {
      this.isEditing = false
      if (!this.editText || this.editText === this.todo.title) {
        return
      }

      this.$emit("update", this.todo.id, this.editText)
    },
    onCancel() {
      this.isEditing = false
      this.editText = null
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
</style>
