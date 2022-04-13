import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: function () {
    return {
      isDarkMode: false,
      allTodo: [],
      doneTodo: [],
    }
  },

  mutations: {
    toogleDarkMode(state) {
      state.isDarkMode = !state.isDarkMode
    },

    handleDoneTodo(state, payload) {
      state.doneTodo.push(payload)
    },

    populateAllTodo(state, payload) {
      state.allTodo = payload
    },
  },

  actions: {
    /* eslint-disable */
    async getTodos({ commit, state }) {
      let response = await fetch("https://jsonplaceholder.typicode.com/posts")
      response = await response.json()
      response = response.slice(-10)

      response.forEach((todo) => (todo.done = false))

      commit("populateAllTodo", response)
    },
  },
})
