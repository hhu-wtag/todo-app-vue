<template>
  <h2 :class="{ done: done }">{{ title }}</h2>
</template>

<script>
export default {
  props: ["done", "title"],
}
</script>

<style>
.done {
  text-decoration: line-through;
  color: green;
}
</style>
