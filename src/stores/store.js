import Vue from "vue"
import Vuex from "vuex"
import {
  ADD_TODO,
  SET_DONE,
  SET_UPDATE,
  REMOVE_TODO,
  SET_LIMIT,
  SET_TODO,
  RESET_LIMIT,
} from "./mutation-types.js"
import supabase from "@/utils/supabase"

Vue.use(Vuex)

export default new Vuex.Store({
  state: function () {
    return {
      todos: [],
      limit: 4,
    }
  },

  getters: {
    getTodos(state) {
      return state.todos.slice(0, state.limit)
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
        if (option === "all") return state.todos.slice(0, state.limit)
        else if (option === "com")
          return state.todos.filter((todo) => todo.done).slice(0, state.limit)
        else
          return state.todos.filter((todo) => !todo.done).slice(0, state.limit)
      },

    activeLoadMore: (state) => {
      return state.todos.length > state.limit
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

    [SET_LIMIT](state) {
      state.limit = state.limit + 4
    },

    [SET_TODO](state, payload) {
      state.todos = payload
    },

    [RESET_LIMIT](state) {
      state.limit = 4
    },
  },

  /* eslint-disable */

  actions: {
    async getAllTodo({ commit }) {
      async function getData() {
        let response = null
        try {
          response = await supabase
            .from("Todo")
            .select("*")
            .order("created_at", { ascending: false })
        } catch (error) {
          console.error(error)
        }

        return response.data
      }

      commit(SET_TODO, await getData())
    },

    async getTodo({ commit }, { id }) {
      try {
        let response = await supabase.from("Todo").select("*").eq("id", id)

        return response.data[0]
      } catch (error) {
        console.error(error)
      }
    },

    async addTodoItem({ dispatch }, { title, desc }) {
      let response = null
      try {
        response = await supabase.from("Todo").insert([{ title, desc }])

        await dispatch("getAllTodo")
      } catch (error) {
        console.error(error)
      }
    },

    async setTodoDone({ dispatch }, { id }) {
      try {
        const response = await supabase
          .from("Todo")
          .update({ done: true })
          .eq("id", id)

        dispatch("getAllTodo")
      } catch (error) {
        console.error(error)
      }
    },

    async removeTodoItem({ dispatch }, { id }) {
      try {
        const response = await supabase.from("Todo").delete().eq("id", id)

        dispatch("getAllTodo")
      } catch (error) {
        console.error(error)
      }
    },

    async setTodoUpdate({ dispatch }, { id, editedTitle, editedDesc }) {
      try {
        const response = await supabase
          .from("Todo")
          .update({ title: editedTitle, desc: editedDesc })
          .eq("id", id)

        dispatch("getAllTodo")
      } catch (error) {
        console.error(error)
      }
    },

    setTodoLimit({ commit }) {
      commit(SET_LIMIT)
    },
  },
})
