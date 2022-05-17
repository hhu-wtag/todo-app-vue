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
  data() {
    return {
      badgeType: null,
      badgeSvgColor: null,
    }
  },

  computed: {
    highPriority() {
      return this.badgeType === "high"
    },

    midPriority() {
      return this.badgeType === "mid"
    },

    lowPriority() {
      return this.badgeType === "low"
    },
  },

  watch: {
    code: function () {
      this.applyBadge()
    },
  },
  methods: {
    applyBadge() {
      switch (this.code) {
        case "high":
          this.badgeType = "high"
          this.badgeSvgColor = "color: red;"
          break
        case "mid":
          this.badgeType = "mid"
          this.badgeSvgColor = "color: blue;"
          break
        case "low":
          this.badgeType = "low"
          this.badgeSvgColor = "color: green;"
          break
      }
    },
  },
  mounted() {
    this.applyBadge()
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

.priority-high {
  color: red;
}

.priority-mid {
  color: blue;
}

.priority-low {
  color: green;
}
</style>
