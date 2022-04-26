<template>
  <div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      class="actionButton"
    >
      <path
        d="M20.285 0L9 11.567L3.714 6.556L0 10.272L9 19L24 3.715L20.285 0Z"
        fill="#BBBDD0"
      />
    </svg>

    <ToolTip body="Done"></ToolTip>
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
