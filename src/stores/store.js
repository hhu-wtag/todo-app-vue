import Vue from "vue"
import Vuex from "vuex"
import {
  ADD_TODO,
  SET_DONE,
  SET_UPDATE,
  REMOVE_TODO,
} from "./mutation-types.js"

Vue.use(Vuex)

export default new Vuex.Store({
  state: function () {
    return {
      todos: [],
    }
  },

  getters: {
    getTodos(state) {
      return state.todos
    },

    getTodo: (state) => (id) => {
      const index = state.todos.findIndex((todo) => todo.id === parseInt(id))

      if (index === -1) {
        return {
          status: "not-found",
          todo: null,
        }
      } else {
        return {
          status: "ok",
          todo: state.todos[index],
        }
      }
    },

    getFilterTodos:
      (state) =>
      (option = "all") => {
        if (option === "all") return state.todos
        else if (option === "com")
          return state.todos.filter((todo) => todo.done)
        else return state.todos.filter((todo) => !todo.done)
      },
  },

  mutations: {
    [ADD_TODO](state, payload) {
      state.todos.push({
        title: payload.title,
        desc: payload.desc,
        id: Date.now(),
        done: false,
      })
    },

    [SET_DONE](state, payload) {
      let index = state.todos.findIndex((todo) => todo.id === payload.id)

      Vue.set(state.todos, index, {
        ...state.todos[index],
        done: true,
      })
    },

    [REMOVE_TODO](state, payload) {
      state.todos = state.todos.filter((item) => item.id !== payload.id)
    },

    [SET_UPDATE](state, payload) {
      let index = state.todos.findIndex((todo) => todo.id === payload.id)

      Vue.set(state.todos, index, {
        ...state.todos[index],
        title: payload.editedTitle,
        desc: payload.editedDesc,
      })
    },
  },

  /* eslint-disable */

  actions: {
    addTodoItem({ commit }, payload) {
      commit(ADD_TODO, payload)
    },

    setTodoDone({ commit }, payload) {
      commit(SET_DONE, payload)
    },

    removeTodoItem({ commit }, payload) {
      commit(REMOVE_TODO, payload)
    },

    setTodoUpdate({ commit }, payload) {
      commit(SET_UPDATE, payload)
    },
  },
})
