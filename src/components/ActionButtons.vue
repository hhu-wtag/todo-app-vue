<template>
  <div class="actionButtons">
    <TodoButton v-if="showDoneButton" @click="onDone">
      <DoneIcon />
    </TodoButton>
    <TodoButton @click="onDelete">
      <DeleteIcon />
    </TodoButton>

    <TodoButton v-if="showEditButton" @click="onEdit">
      <EditIcon />
    </TodoButton>

    <TodoButton v-if="showEditStateButton" @click="onCancel"
      ><CancelIcon
    /></TodoButton>
  </div>
</template>

<script>
import TodoButton from "./TodoButton"
import DoneIcon from "./icons/DoneIcon"
import DeleteIcon from "./icons/DeleteIcon"
import EditIcon from "./icons/EditIcon"
import CancelIcon from "./icons/CancelIcon"

export default {
  props: {
    todo: {
      type: Object,
      required: true,
    },
    isEditing: {
      type: Boolean,
      default: false,
    },
    inDetailedMode: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    TodoButton,
    DoneIcon,
    DeleteIcon,
    EditIcon,
    CancelIcon,
  },

  computed: {
    showEditButton() {
      return !this.isEditing && !this.todo.done && this.inDetailedMode
    },

    showDoneButton() {
      return !this.todo.done && !this.isEditing
    },

    showEditStateButton() {
      return this.isEditing && !this.todo.done
    },
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
