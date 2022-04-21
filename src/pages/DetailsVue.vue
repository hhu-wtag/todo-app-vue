<template>
  <div>
    <TodoItem
      :todo="todo"
      @done="onDone"
      @delete="onDelete"
      @update="onUpdate"
      :inDetailedMode="true"
      class="card detailedView"
    />

    <router-link to="/">Back</router-link>
  </div>
</template>

<script>
import TodoItem from "@/components/TodoItem.vue"
export default {
  components: { TodoItem },

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

  mounted() {
    this.todo = JSON.parse(this.$route.params.todo)
  },
}
</script>

<style lang="scss">
.detailedView {
  width: 100% !important;
  height: 80vh;
}
</style>
