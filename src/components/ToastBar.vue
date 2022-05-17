<template>
  <div class="toast__container" :class="showToastError && 'error'">
    <p>{{ toastBody }}</p>
  </div>
</template>

<script>
import { REMOVE_TOAST } from "@/stores/mutation-types"

export default {
  props: {
    toast: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      timeoutID: null,
    }
  },

  computed: {
    showToastError() {
      return this.toast.type === "error"
    },

    toastBody() {
      return this.toast.body
    },
  },

  mounted() {
    this.timeoutID = setTimeout(() => {
      this.$store.commit(REMOVE_TOAST, { id: this.toast.id })
    }, 2000)
  },

  beforeDestroy() {
    clearTimeout(this.timeoutID)
  },
}
</script>

<style lang="scss">
.toast__container {
  padding: 1rem 3rem;
  color: white;
  font-weight: bold;
  background: $text-success;
  border-radius: 5px;
  margin-bottom: 1rem;
}

.error {
  background: #e85f5f;
}
</style>
