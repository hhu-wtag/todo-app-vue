<template>
  <div id="app" class="todo__container">
    <NavBar />
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue"

export default {
  components: {
    NavBar,
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
