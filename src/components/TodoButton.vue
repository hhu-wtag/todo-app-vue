<template>
  <button @click="handler">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ["handler"],
}
</script>

<style></style>
