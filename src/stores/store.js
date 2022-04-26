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
  RESET_TODOS,
  SET_SEARCH_DATA,
  SET_SEARCH_STATE,
  SET_FILTER,
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
    }
  },

  getters: {
    getTodos(state) {
      let option = state.currentFilter

      if (option === "all") {
        state.allTodoLen = state.todos.length
        return state.todos.slice(0, state.limit)
      } else if (option === "com") {
        let filteredList = state.todos.filter((todo) => todo.done)

        state.comTodoLen = filteredList.length
        return filteredList.slice(0, state.limit)
      } else {
        let filteredList = state.todos.filter((todo) => !todo.done)
        state.incTodoLen = filteredList.length
        return filteredList.slice(0, state.limit)
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

    async addTodoItem({ dispatch }, { title, desc }) {
      let response = null
      try {
        response = await supabase.from("Todo").insert([{ title, desc }])

        await dispatch("getAllTodo")
      } catch (error) {
        throw new Error(error)
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
        throw new Error(error)
      }
    },

    async removeTodoItem({ dispatch }, { id }) {
      try {
        const response = await supabase.from("Todo").delete().eq("id", id)

        dispatch("getAllTodo")
      } catch (error) {
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
