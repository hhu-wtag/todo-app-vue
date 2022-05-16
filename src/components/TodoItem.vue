<template>
  <div class="todo" :class="{ disabled: showSpinner }">
    <SpinnerIcon v-if="showSpinner" />

    <div class="todo__header" :class="inDetailMode && 'todo__header-detail'">
      <div v-if="!isEditing" :class="detailPageStyle">
        <div
          class="todo__header_titleContainer"
          :class="inDetailMode && detailMobileViewStyle && 'flex-col'"
        >
          <router-link v-if="!inDetailMode" :to="`/details/${todo.id}`">
            <p class="todo__header_title" :class="{ done: isDone }">
              {{ todoTitle }}
            </p>
          </router-link>

          <div class="todo__header_title-detail" v-else>
            <p>
              <span>Title: </span>
              {{ todoTitle }}
            </p>
          </div>

          <CustomBadge :code="todoPriority" />
        </div>

        <p class="todo__header_createdAt" :class="inDetailMode && 'text-base'">
          Created at: {{ created_at }}
        </p>

        <div v-if="!inDetailMode">
          <p class="todo__header_desc">
            {{ todoDescription }}
          </p>
        </div>

        <div class="todo__header_descContainer" v-else>
          <p class="todo__header_desc-detail">
            {{ todoDescription }}
          </p>
        </div>
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
    <div class="todo__footer" :class="inDetailMode && 'justify-center'">
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

      <div
        v-if="isDone"
        class="todo__footer-completedIn"
        :class="inDetailMode && 'ml-4'"
      >
        Completed in {{ doneInDays }}
      </div>
    </div>
  </div>
</template>

<script>
import ActionButtons from "./ActionButtons"
import CreateTodo from "./CreateTodo"
import SpinnerIcon from "./icons/SpinnerIcon"
import moment from "moment"
import CustomBadge from "./CustomBadge.vue"

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
    CustomBadge,
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
    created_at() {
      return moment.utc(this.todo?.created_at).format("DD.MM.YY")
    },
    doneInDays() {
      return `${this.todo?.doneIn} ${this.todo?.doneIn === 0 ? "day" : "days"}`
    },

    todoTitle() {
      if (!this.inDetailMode) {
        return (
          this.todo?.title.slice(0, 30) +
          (this.todo?.title.length > 30 ? "..." : "")
        )
      } else {
        return this.todo?.title
      }
    },

    todoDescription() {
      if (!this.inDetailMode) {
        return (
          this.todo?.desc.slice(0, 55) +
          (this.todo?.desc.length > 55 ? "..." : "")
        )
      } else {
        return this.todo?.desc
      }
    },

    todoPriority() {
      return this.todo?.priority
    },

    detailPageStyle() {
      return {
        detailMode: this.inDetailMode,
      }
    },

    detailMobileViewStyle() {
      if (window.innerWidth < 480) {
        return true
      } else {
        return false
      }
    },
  },
  methods: {
    async onDone() {
      this.isEditing = false
      this.showSpinner = true

      try {
        const created_at_unix = Math.floor(
          new Date(this.todo.created_at).getTime() / 1000
        )
        const timeOfCompletion = Math.floor(new Date().getTime() / 1000)

        let completedInDay = parseInt(
          (timeOfCompletion - created_at_unix) / 86400
        )

        await this.$store.dispatch("setTodoDone", {
          id: this.todo.id,
          completedInDay,
        })
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
    async onEditUpdate(title, desc, priority) {
      this.showSpinner = true

      try {
        await this.$store.dispatch("setTodoUpdate", {
          id: this.todo.id,
          editedTitle: title,
          editedDesc: desc,
          priority,
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

  &_titleContainer {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  &_title {
    margin-right: 1rem;
    font-size: 16px;
    font-weight: bold;

    &-detail {
      display: flex;
      align-items: center;
      margin-right: 1rem;
      font-size: 24px;
      font-weight: bold;
    }
  }

  &_desc {
    font-size: 14px;
    color: $text-secondary;

    &-detail {
      font-size: 18px;
    }
  }

  &_createdAt {
    font-size: 14px;
    font-weight: bold;
    color: $text-secondary;
  }
}

.todo__footer {
  display: flex;
  justify-content: space-between;

  &-completedIn {
    background-color: $text-accent;
    color: white;
    padding: 2px 8px;
    font-weight: bold;
    border-radius: 5px;
    font-size: 12px;
  }
}

.createTodo__detailed {
  width: 100% !important;
  align-items: center;
}

.detailMode {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}

.detailMode > * + * {
  margin-top: 1rem;
}

.todoCompleteLabel {
  font-size: 14px;
  background-color: $text-success;
  color: white;
  padding: 4px 8px;
  border-radius: 5px;
  height: fit-content;
}

.text-base {
  font-size: 1rem;
}

.text-sm {
  font-size: 12px;
}

.text-xsm {
  font-size: 10px;
}

.text-xxsm {
  font-size: 8px;
}

.ml-4 {
  margin-left: 1rem;
}

.flex-col {
  flex-direction: column;
}

.justify-center {
  justify-content: center;
}

@media only screen and (max-width: 480px) {
  .todo__header_titleContainer > * + * {
    margin-top: 8px;
  }
}
</style>
