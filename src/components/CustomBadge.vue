<template>
  <div class="badge__container" :class="badgeStyle">
    <p>{{ badgeText }}</p>
  </div>
</template>

<script>
export default {
  props: {
    code: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      badgeText: null,
      badgeStyle: null,
    }
  },

  mounted() {
    switch (this.code) {
      case "red":
        this.badgeText = "Priority Max"
        this.badgeStyle = "priority-red"
        break

      case "yellow":
        this.badgeText = "Priority High"
        this.badgeStyle = "priority-yellow"
        break

      case "blue":
        this.badgeText = "Priority Normal"
        this.badgeStyle = "priority-blue"
        break

      case "green":
        this.badgeText = "Priority Low"
        this.badgeStyle = "priority-green"
        break
    }
  },
}
</script>

<style lang="scss">
.badge__container {
  border-radius: 2px;
  flex: 0 0 auto;
  border-radius: 5px;
  padding: 2px 4px;
  font-size: 14px;
}

.priority-red {
  border: 2px solid #ff6363;
}

.priority-yellow {
  border: 2px solid #ffef82;
}

.priority-blue {
  border: 2px solid #cddeff;
}

.priority-green {
  border: 2px solid #fbf3e4;
}
</style>
