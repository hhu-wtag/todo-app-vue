<template>
  <button @click="$emit('handler')">
    <slot></slot>
  </button>
</template>

<script>
export default {}
</script>

<style></style>
