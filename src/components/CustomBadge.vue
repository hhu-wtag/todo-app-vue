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

  watch: {
    code: function () {
      this.applyBadge()
    },
  },

  methods: {
    applyBadge() {
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
  },

  mounted() {
    this.applyBadge()
  },
}
</script>

<style lang="scss">
.badge__container {
  display: flex;
  border-radius: 2px;
  flex: 0 0 auto;
  border-radius: 5px;
  padding: 2px 4px;
  font-size: 14px;
  justify-content: center;
  align-items: center;
}

.priority-red {
  border: 2px solid #ff6363;
}

.priority-yellow {
  border: 2px solid #ffe430;
}

.priority-blue {
  border: 2px solid #9abcff;
}

.priority-green {
  border: 2px solid #6ff49d;
}
</style>
