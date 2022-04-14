<template>
  <div>
    <textarea
      type="text"
      @input="$emit('input', $event.target.value)"
      :value="value"
      name="todoInput"
      id="todoInput"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
    },
  },
}
</script>
