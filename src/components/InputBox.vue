<template>
  <div>
    <input
      type="text"
      @input="$emit('input', $event.target.value)"
      :value="value"
      name="todoInput"
      id="todoInput"
    />

    <button type="submit" @click="handleAddOrUpdate">
      <slot></slot>
    </button>

    <button v-if="identifier === 'todoInput'" @click="handleCancel">
      Cancel
    </button>
  </div>
</template>

<script>
export default {
  props: ["value", "editMode", "id", "identifier", "todo"],
  data: function () {
    return {
      intialTitle: "",
    }
  },

  methods: {
    handleAddOrUpdate(e) {
      this.intialTitle = this.value
      this.$emit("handler", e, this.id)
    },

    handleCancel(e) {
      this.$emit("handleCancel", e, this.id, this.intialTitle)
    },
  },

  mounted() {
    this.intialTitle = this.value
  },
}
</script>
