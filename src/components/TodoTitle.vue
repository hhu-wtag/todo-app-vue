<template>
  <h2 :class="{ done: done }">{{ title }}</h2>
</template>

<script>
export default {
  props: {
    done: {
      type: Boolean,
    },
    title: {
      type: String,
    },
  },
}
</script>

<style>
.done {
  text-decoration: line-through;
  color: green;
}
</style>
