<template>
  <div class="relative">
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      class="priorityIcon"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.6569 11.2929L16.2427 12.7071L12 8.46444L7.75735 12.7071L6.34314 11.2929L12 5.63605L17.6569 11.2929Z"
        fill="#FF4949"
      />
      <path
        d="M17.6569 16.9497L16.2427 18.3639L12 14.1213L7.75735 18.364L6.34314 16.9498L12 11.2929L17.6569 16.9497Z"
        fill="#FF4949"
      />
    </svg>

    <ToolTip body="High Priority" />
  </div>
</template>

<script>
import ToolTip from "../ToolTip.vue"

export default {
  components: {
    ToolTip,
  },
}
</script>

<style>
.relative {
  position: relative;
}
</style>
