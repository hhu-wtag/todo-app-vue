<template>
  <div class="badge__container" :class="badgeStyle"></div>
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
        this.badgeText = "Urgent"
        this.badgeStyle = "priority-red"
        break

      case "yellow":
        this.badgeText = "Within Tomorrow"
        this.badgeStyle = "priority-yellow"
        break

      case "blue":
        this.badgeText = "Chill Out"
        this.badgeStyle = "priority-blue"
        break

      case "green":
        this.badgeText = "Happily Forget"
        this.badgeStyle = "priority-green"
        break
    }
  },
}
</script>

<style lang="scss">
.badge__container {
  height: 12px;
  width: 12px;
  border-radius: 2px;
  flex: 0 0 auto;
}

.priority-red {
  border: 2px solid #ff6363;
}

.priority-yellow {
  border: 2px solid #cee397;
}

.priority-blue {
  border: 2px solid #cddeff;
}

.priority-green {
  border: 2px solid #fbf3e4;
}
</style>
