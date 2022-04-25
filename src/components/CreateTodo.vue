<template>
  <div class="createTodo card" :class="{ disabled: showSpinner }">
    <SpinnerIcon v-if="showSpinner" />
    <div class="createTodo__inputBox">
      <label for="createTodo__inputBox_titleLabel">Title</label>
      <input
        type="text"
        class="createTodo__inputBox_titleInput"
        v-model.trim="title"
      />
      <span v-show="isTitleError">Title is required.</span>

      <label for="createTodo__inputBox_descLabel">Description</label>
      <textarea
        class="createTodo__inputBox_descInput"
        v-model.trim="description"
      />
      <span v-show="isDescError">Description is required.</span>
    </div>

    <div class="createTodo__button">
      <button
        v-if="!inDetailMode"
        class="createTodo__button_add btn"
        @click="onAdd"
      >
        Add
      </button>
      <button v-else class="createTodo__button_add btn" @click="onUpdate">
        Update
      </button>
      <div
        v-if="!inDetailMode"
        class="createTodo__button_cancel btn"
        @click="onCancel"
      >
        <DeleteIcon />
      </div>
    </div>
  </div>
</template>

<script>
import DeleteIcon from "@/components/icons/DeleteIcon"
import { mapGetters } from "vuex"
import SpinnerIcon from "./icons/SpinnerIcon.vue"

export default {
  components: {
    DeleteIcon,
    SpinnerIcon,
  },
  props: {
    inDetailMode: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
    },

    todoItem: {
      type: Object,
    },
  },
  data() {
    return {
      title: null,
      description: null,
      isTitleError: false,
      isDescError: false,
      showSpinner: false,
    }
  },
  computed: {
    ...mapGetters(["getTodo"]),

    todo() {
      return this.getTodo(this.id)
    },
  },
  mounted() {
    if (this.inDetailMode) {
      this.title = this.todoItem.title
      this.description = this.todoItem.desc
    }
  },
  methods: {
    async onAdd() {
      if (!this.isValidate()) return

      this.showSpinner = true

      await this.$store.dispatch("addTodoItem", {
        title: this.title,
        desc: this.description,
      })

      this.showSpinner = false

      this.$emit("add")
      this.onCancel()
    },
    onUpdate() {
      if (!this.isValidate()) return

      this.$emit("update", this.title, this.description)
    },
    onCancel() {
      this.$emit("cancel")
    },

    isValidate() {
      if (!this.title) {
        this.isTitleError = true
        return false
      }

      if (!this.description) {
        this.isDescError = true
        return false
      }

      return true
    },
  },
}
</script>

<style lang="scss">
.createTodo {
  position: relative;
}

.createTodo__inputBox_descInput {
  resize: none;
  height: 5rem;
}

.createTodo__inputBox {
  display: flex;
  flex-direction: column;

  &_descInput,
  &_titleInput {
    margin-bottom: 12px;
    border: 3px solid $border-primary;
    border-radius: 5px;
  }
}

.createTodo__button > button {
  font-size: 12px;
  padding: 8px 12px;
  border: 1px solid #d1d8ff;
  background-color: $bg-secondary;
}

.createTodo__button {
  display: flex;
  align-items: center;

  &_cancel {
    margin-left: 18px;
  }
}
</style>
