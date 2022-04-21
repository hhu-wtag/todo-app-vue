<template>
  <div>
    <p v-if="noItem">No Item Found.</p>

    <TodoItem
      v-else
      :todo="todoItem"
      :inDetailedMode="true"
      class="card detailedView"
    />

    <div class="detail__goback">
      <router-link to="/">Go Back</router-link>
    </div>
  </div>
</template>

<script>
import TodoItem from "@/components/TodoItem.vue"
// import { mapGetters } from "vuex"
export default {
  components: { TodoItem },

  data() {
    return {
      todoItem: null,
      noItem: false,
    }
  },

  // computed: {
  //   ...mapGetters({
  //     todo: "getTodo",
  //   }),
  // },

  created() {
    const response = this.$store.getters.getTodo(this.$route.params.id)

    if (response.status === "ok") {
      this.todoItem = response.todo
    } else {
      this.noItem = true
    }
  },
}
</script>

<style lang="scss">
.detailedView {
  width: 100% !important;
  height: 80vh;
  padding: 5rem 10rem;
  align-items: center;
}

.detail__goback {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 1rem;

  & > a {
    background: $text-primary;
    color: white;
    padding: 8px 12px;
    border-radius: 5px;
  }
  & > a:hover {
    background: #232323;
  }
}
</style>
