<template>
  <div class="tooltip">{{ body }}</div>
</template>

<script>
export default {
  props: {
    body: {
      type: String,
      required: true,
    },
  },
}
</script>

<style>
.tooltip {
  position: absolute;
  flex: 0 0 auto;
  top: -35px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  background: #32394b;
  color: white;
  transition: opacity 100ms ease-in-out;
  border-radius: 3px;
  border: 1px solid gray;
  pointer-events: none;
  padding: 4px;
  font-size: 12px;
  opacity: 0;
  z-index: 9999;
  min-width: 5rem;
}
</style>
