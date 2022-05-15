<template>
  <div class="todo" :class="{ disabled: showSpinner }">
    <SpinnerIcon v-if="showSpinner" />

    <div class="todo__header" :class="inDetailMode && 'todo__header-detail'">
      <div v-if="!isEditing" :class="detailPageStyle">
        <div class="todo__header_titleContainer">
          <router-link v-if="!inDetailMode" :to="`/details/${todo.id}`">
            <h1 class="todo__header_title" :class="{ done: isDone }">
              {{ todoTitle }}
            </h1>
          </router-link>

          <div
            class="todo__header_title-detail"
            :class="detailMobileViewStyle && 'text-base'"
            v-else
          >
            <h1>
              <span>Title: </span>
              {{ todoTitle }}
            </h1>
            <span v-if="isDone" class="todoCompleteLabel ml-4"
              >Todo Completed</span
            >
          </div>

          <CustomBadge :code="todo.priority" />
        </div>

        <p class="todo__header_createdAt" :class="inDetailMode && 'text-base'">
          Created at: {{ created_at }}
        </p>

        <p class="todo__header_desc" v-if="!inDetailMode">
          {{ todoDescription }}
        </p>

        <p
          class="todo__header_desc-detail"
          :class="detailMobileViewStyle && 'text-sm'"
          v-else
        >
          {{ todoDescription }}
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

  &_titleContainer {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  &_title {
    font-size: 18px;
    margin-right: 1rem;

    &-detail {
      display: flex;
      align-items: center;
      margin-right: 1rem;
    }
  }

  &_desc {
    font-size: 14px;
    color: $text-secondary;

    &-detail {
      font-size: 1.5rem;
    }
  }

  &_createdAt {
    font-size: 14px;
    font-weight: bold;
    color: $text-secondary;
  }

  &-detail {
    width: 70%;
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
</style>
