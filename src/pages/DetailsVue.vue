<template>
  <div>
    <TodoComp
      :todo="todo"
      @done="onDone"
      @delete="onDelete"
      @update="onUpdate"
      :inDetailedMode="inDetailedMode"
      class="card detailedView"
    />

    <router-link to="/">Back</router-link>
  </div>
</template>

<script>
import TodoComp from "@/components/TodoComp.vue"
export default {
  props: {
    todo: {
      type: Object,
    },

    inDetailedMode: {
      type: Boolean,
    },
  },
  components: { TodoComp },

  methods: {
    onDone() {
      this.$emit("done")
    },
    onDelete() {
      this.$emit("delete")
    },
    onUpdate() {
      this.$emit("update")
    },
  },
}
</script>

<style lang="scss">
.detailedView {
  width: 100%;
  height: 80%;
}
</style>
