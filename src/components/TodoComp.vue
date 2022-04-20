<template>
  <div>
    <h1 v-if="!isEditing" :class="{ done: isDone }">
      {{ todo.title }}
    </h1>

    <p>{{ todo.desc }}</p>

    <InputBox
      v-if="isEditing"
      identifier="initalInput"
      :value="editText"
      v-model.trim="editText"
    />

    <ActionButtons
      identifier="todoButtons"
      :todo="todo"
      :isEditing="isEditing"
      @done="onDone"
      @delete="onDelete"
      @edit="onEdit"
      @update="onUpdate"
      @cancel="onCancel"
    />
  </div>
</template>

<script>
import ActionButtons from "./ActionButtons"
import InputBox from "./InputBox"

export default {
  props: {
    todo: {
      type: Object,
    },
  },
  components: {
    ActionButtons,
    InputBox,
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
</style>
