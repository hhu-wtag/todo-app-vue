<template>
  <div>
    <TodoTitle v-if="!isEditing" :done="todo.done" :title="todo.title" />

    <InputBox
      v-if="isEditing"
      identifier="initalInput"
      :value="editText"
      v-model="editText"
    />

    <ActionButtons
      identifier="todoButtons"
      :todo="todo"
      :isEditing="isEditing"
      @handleDone="onDone"
      @handleDelete="onDelete"
      @onEdit="onEdit"
      @onUpdate="onUpdate"
      @onCancel="onCancel"
    />
  </div>
</template>

<script>
import TodoTitle from "./TodoTitle"
import ActionButtons from "./ActionButtons"
import InputBox from "./InputBox"
/* eslint-disable */
export default {
  props: {
    todo: {
      type: Object,
    },
  },
  components: {
    TodoTitle,
    ActionButtons,
    InputBox,
  },

  data() {
    return {
      editText: null,
      isEditing: false,
    }
  },

  methods: {
    onDone() {
      this.$emit("onDone", this.todo.id)
    },
    onDelete() {
      this.$emit("onDelete", this.todo.id)
    },
    onEdit() {
      this.isEditing = true
      this.editText = this.todo.title
    },
    onUpdate() {
      this.isEditing = false
      if (
        this.editText === null ||
        this.editText === "" ||
        this.editText === this.todo.title
      ) {
        return
      }

      this.$emit("onUpdate", this.todo.id, this.editText)
    },
    onCancel() {
      this.isEditing = false
      this.editText = null
    },
  },
}
</script>

<style></style>
