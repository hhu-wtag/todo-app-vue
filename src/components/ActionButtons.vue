<template>
  <div class="actionButtons">
    <TodoButton v-if="!todo.done" @click="onDone">
      <DoneIcon />
    </TodoButton>
    <TodoButton @click="onDelete">
      <DeleteIcon />
    </TodoButton>

    <TodoButton
      v-if="!isEditing && !todo.done && inDetailedMode"
      @click="onEdit"
    >
      <EditIcon />
    </TodoButton>

    <TodoButton v-if="isEditing && !todo.done" @click="onUpdate"
      >Update</TodoButton
    >

    <TodoButton v-if="isEditing && !todo.done" @click="onCancel"
      >Cancel</TodoButton
    >
  </div>
</template>

<script>
import TodoButton from "./TodoButton"
import DoneIcon from "./icons/DoneIcon.vue"
import DeleteIcon from "./icons/DeleteIcon.vue"
import EditIcon from "./icons/EditIcon.vue"
export default {
  props: {
    todo: {
      type: Object,
    },
    identifier: {
      type: String,
    },
    isEditing: {
      type: Boolean,
    },

    inDetailedMode: {
      type: Boolean,
    },
  },
  components: {
    TodoButton,
    DoneIcon,
    DeleteIcon,
    EditIcon,
  },
  methods: {
    onDone() {
      this.$emit("done", this.todo.id)
    },
    onDelete() {
      this.$emit("delete", this.todo.id)
    },
    onEdit() {
      this.$emit("edit", this.todo.id)
    },
    onUpdate() {
      this.$emit("update", this.todo.id)
    },
    onCancel() {
      this.$emit("cancel", this.todo.id)
    },
  },
}
</script>

<style lang="scss">
.actionButtons {
  display: flex;
  align-items: center;
}

.actionButtons > * + * {
  margin-left: 24px;
}
</style>
