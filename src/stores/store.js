import Vue from "vue"
import Vuex from "vuex"
import {
  ADD_MUTATION,
  DONE_MUTATION,
  DELETE_MUTATION,
  UPDATE_MUTATION,
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
  },

  mutations: {
    [ADD_MUTATION](state, payload) {
      state.todos.push({
        title: payload.title,
        id: Date.now(),
        done: false,
      })
    },

    [DONE_MUTATION](state, payload) {
      let index = state.todos.findIndex((todo) => todo.id === payload.id)

      Vue.set(state.todos, index, {
        ...state.todos[index],
        done: true,
      })
    },

    [DELETE_MUTATION](state, payload) {
      state.todos = state.todos.filter((item) => item.id !== payload.id)
    },

    [UPDATE_MUTATION](state, payload) {
      let index = state.todos.findIndex((todo) => todo.id === payload.id)

      Vue.set(state.todos, index, {
        ...state.todos[index],
        title: payload.editText,
      })
    },
  },

  /* eslint-disable */

  actions: {
    addAction({ commit }, title) {
      commit(ADD_MUTATION, { title })
    },

    doneAction({ commit }, id) {
      commit(DONE_MUTATION, { id })
    },

    deleteAction({ commit }, id) {
      commit(DELETE_MUTATION, { id })
    },

    updateAction({ commit }, id, title) {
      commit(UPDATE_MUTATION, { id, title })
    },
  },
})
