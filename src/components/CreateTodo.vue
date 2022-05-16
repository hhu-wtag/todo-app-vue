<template>
  <div class="createTodo card" :class="{ disabled: showSpinner }">
    <SpinnerIcon v-if="showSpinner" />
    <div
      class="createTodo__inputBox"
      :class="inDetailMode && 'createTodo__inputBox-detail'"
    >
      <label for="createTodo__inputBox_titleLabel">Title</label>
      <input
        type="text"
        class="createTodo__inputBox_titleInput"
        v-model.trim="title"
      />
<<<<<<< HEAD
      <span v-show="isTitleError" class="createTodo__inputBox_error"
=======
      <span v-show="isTitleError" class="requiredError"
>>>>>>> fcbb8624f60095656adaf04f4eacb74e9b282918
        >Title is required.</span
      >

      <label for="createTodo__inputBox_descLabel">Description</label>
      <textarea
        class="createTodo__inputBox_descInput"
        :class="inDetailMode && 'createTodo__inputBox_descInput-detail'"
        v-model.trim="description"
      />
<<<<<<< HEAD
      <span v-show="isDescError" class="createTodo__Desc_error"
        >Description is required.</span
      >
=======
      <span v-show="isDescError" class="requiredError"
        >Description is required.</span
      >

      <label for="createTodo__inputBox_priorityLabel">Priority</label>
      <v-select
        :options="priorities"
        :reduce="(priority) => priority.code"
        v-model="priority"
        label="label"
      />
>>>>>>> fcbb8624f60095656adaf04f4eacb74e9b282918
    </div>

    <div class="createTodo__button">
      <button
        v-if="!inDetailMode"
        class="createTodo__button_add btn"
        id="createTodo__add"
        @click="onAdd"
      >
        Add
      </button>
      <button
        id="createTodo__update"
        v-else
        class="createTodo__button_add btn"
        @click="onUpdate"
      >
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
import SpinnerIcon from "./icons/SpinnerIcon"
import sanitizeHtml from "sanitize-html"

import vSelect from "vue-select"
import "vue-select/dist/vue-select.css"

export default {
  components: {
    DeleteIcon,
    SpinnerIcon,
    "v-select": vSelect,
  },
  props: {
    inDetailMode: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      default: null,
    },

    todoItem: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      title: null,
      description: null,
      isTitleError: false,
      isDescError: false,
      showSpinner: false,
      priorities: [
        { label: "High", code: "high" },
        { label: "Mid", code: "mid" },
        { label: "Low", code: "low" },
      ],
      priority: "mid",
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
      const { title, desc } = this.todoItem
      this.title = title
      this.description = desc
    }
  },
  methods: {
    async onAdd() {
      this.title = sanitizeHtml(this.title)
      this.description = sanitizeHtml(this.description)

      if (!this.isValidate()) return

      this.showSpinner = true

      try {
        await this.$store.dispatch("addTodoItem", {
          title: this.title,
          desc: this.description,
          priority: this.priority,
        })
      } catch (error) {
        throw new Error(error)
      } finally {
        this.showSpinner = false

        this.$emit("add")
        this.onCancel()
      }
    },
    onUpdate() {
      if (!this.isValidate()) return

      this.$emit("update", this.title, this.description, this.priority)
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

  &-detail {
    height: 12rem;
  }
}

.createTodo__inputBox {
  display: flex;
  flex-direction: column;

  &_descInput,
  &_titleInput {
    margin-bottom: 12px;
    border: 3px solid $border-primary;
    border-radius: 5px;
    padding-left: 0.5rem;
  }

  &-detail {
    width: 100%;
    padding: 2rem 4rem;
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

.requiredError {
  color: #cc0000;
}

.v-select {
  --vs-border-width: 3px;
  --vs-border-color: #d1d8ff;
  --vs-controls-color: #d1d8ff;
  --vs-actions-padding: 0px 4px;
  margin-bottom: 12px;
}

.vs__clear > svg {
  width: 20px;
}

.vs__open-indicator {
  width: 20px;

  &:hover {
    cursor: pointer;
  }
}
</style>
