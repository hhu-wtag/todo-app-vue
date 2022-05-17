<template>
  <div class="badge__container">
    <UpIcon v-if="highPriority" />

    <EqualIcon v-if="midPriority" />

    <DownIcon v-if="lowPriority" />
  </div>
</template>

<script>
import UpIcon from "./icons/UpIcon.vue"
import EqualIcon from "./icons/EqualIcon.vue"
import DownIcon from "./icons/DownIcon.vue"
export default {
  props: {
    code: {
      type: String,
      required: true,
    },
  },

  computed: {
    highPriority() {
      return this.code === "high"
    },

    midPriority() {
      return this.code === "mid"
    },

    lowPriority() {
      return this.code === "low"
    },
  },
  components: { UpIcon, EqualIcon, DownIcon },
}
</script>

<style lang="scss">
.priorityIcon {
  transition: transform 200ms ease-in-out;
}
.badge__container {
  display: flex;

  &:hover .priorityIcon {
    transform: scale(1.5);
  }
}
</style>
