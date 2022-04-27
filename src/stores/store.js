import Vue from "vue"
import Vuex from "vuex"
import {
  ADD_TODO,
  SET_LIMIT,
  SET_TODO,
  RESET_LIMIT,
  RESET_TODOS,
  SET_SEARCH_DATA,
  SET_SEARCH_STATE,
  SET_FILTER,
  ADD_TOAST,
  REMOVE_TOAST,
} from "./mutation-types.js"
import supabase from "@/utils/supabase"

Vue.use(Vuex)

export default new Vuex.Store({
  state: function () {
    return {
      todos: [],
      limit: 8,
      currentFilter: "all",
      isSearching: false,
      allTodoLen: 0,
      incTodoLen: 0,
      comTodoLen: 0,
      toasts: [],
    }
  },

  getters: {
    getTodos(state) {
      let option = state.currentFilter

      let completedTodo = state.todos.filter((todo) => todo.done)
      let inCompletedTodo = state.todos.filter((todo) => !todo.done)

      state.allTodoLen = state.todos.length
      state.comTodoLen = completedTodo.length
      state.incTodoLen = inCompletedTodo.length

      if (option === "all") {
        return state.todos.slice(0, state.limit)
      } else if (option === "com") {
        return completedTodo.slice(0, state.limit)
      } else {
        return inCompletedTodo.slice(0, state.limit)
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
      if (state.currentFilter === "all") {
        return state.allTodoLen > state.limit
      } else if (state.currentFilter === "inc") {
        return state.incTodoLen > state.limit
      } else {
        return state.comTodoLen > state.limit
      }
    },

    getToasts: (state) => {
      return state.toasts
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

    [SET_LIMIT](state) {
      state.limit = state.limit + 4
    },

    [SET_TODO](state, payload) {
      state.todos = [...payload]
    },

    [RESET_TODOS](state) {
      state.todos = []
    },

    [RESET_LIMIT](state) {
      state.limit = 8
    },

    [SET_SEARCH_DATA](state, payload) {
      state.todos = [...payload]
    },

    [SET_SEARCH_STATE](state, payload) {
      state.isSearching = payload.isSearching
    },

    [SET_FILTER](state, payload) {
      state.currentFilter = payload.filter
    },

    [ADD_TOAST](state, { body, type, id }) {
      state.toasts.push({
        body,
        type,
        id,
      })
    },

    [REMOVE_TOAST](state, { id }) {
      let index = state.toasts.findIndex((toast) => toast.id === id)

      state.toasts.splice(index, 1)
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
          throw new Error(error)
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
        throw new Error(error)
      }
    },

    async addTodoItem({ dispatch, commit }, { title, desc }) {
      let response = null
      try {
        response = await supabase.from("Todo").insert([{ title, desc }])

        await dispatch("getAllTodo")
        commit(ADD_TOAST, {
          body: "Succesfully Added Todo.",
          type: "success",
          id: Date.now(),
        })
      } catch (error) {
        commit(ADD_TOAST, {
          body: "Some Error Occured",
          type: "error",
          id: Date.now(),
        })

        throw new Error(error)
      }
    },

    async setTodoDone({ dispatch, commit }, { id, completedInDay }) {
      try {
        const response = await supabase
          .from("Todo")
          .update({ done: true, doneIn: completedInDay })
          .eq("id", id)

        dispatch("getAllTodo")

        commit(ADD_TOAST, {
          body: "Succesfully Update Todo.",
          type: "success",
          id: Date.now(),
        })
      } catch (error) {
        commit(ADD_TOAST, {
          body: "Some Error Occured",
          type: "error",
          id: Date.now(),
        })
        throw new Error(error)
      }
    },

    async removeTodoItem({ dispatch, commit }, { id }) {
      try {
        const response = await supabase.from("Todo").delete().eq("id", id)

        dispatch("getAllTodo")

        commit(ADD_TOAST, {
          body: "Succesfully Removed Todo.",
          type: "success",
          id: Date.now(),
        })
      } catch (error) {
        commit(ADD_TOAST, {
          body: "Some Error Occured",
          type: "error",
          id: Date.now(),
        })
        throw new Error(error)
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
        throw new Error(error)
      }
    },

    setTodoLimit({ commit }) {
      commit(SET_LIMIT)
    },

    async getSearchData({ commit }, payload) {
      try {
        const { data, error } = await supabase
          .from("Todo")
          .select()
          .ilike("title", `%${payload.searchText}%`)
          .order("created_at", { ascending: false })

        commit(SET_SEARCH_DATA, data)
      } catch (error) {
        throw new Error(error)
      }
    },
  },
})
