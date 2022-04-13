<template>
  <div>
    <p>Total Number of Todos: {{ arrLen }}</p>
    <input
      type="text"
      @input="$emit('input', $event.target.value)"
      :value="value"
      name="todoInput"
      id="todoInput"
    />

    <button type="submit" @click="$emit('handler', $event)">Add Todo</button>
  </div>
</template>

<script>
export default {
  props: ["value", "arrLen"],
  data: function () {
    return {}
  },
}
</script>
