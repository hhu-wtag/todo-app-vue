<template>
  <div id="app" class="todo__container">
    <NavBar />
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from "./components/NavBar"

export default {
  components: {
    NavBar,
  },
  created() {
    this.$store.dispatch("getAllTodo")
  },
}
</script>

<style lang="scss">
.todo__container {
  color: $text-primary;
  background: $bg-primary;
  height: 100%;
}
</style>
