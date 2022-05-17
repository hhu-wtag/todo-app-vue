import { shallowMount } from "@vue/test-utils"
import TodoItem from "@/components/TodoItem.vue"
import SpinnerIcon from "@/components/icons/SpinnerIcon"
import CreateTodo from "@/components/CreateTodo.vue"

const exampleTodo = {
  title: "Lorem",
  desc: "Lorem ipsum set amit dolor",
  id: "sadfkasdfkajdfjadsf",
  done: false,
  priority: "high",
}

describe("@component/TodoItem", () => {
  it("has disabled class when spinner is active", async () => {
    const wrapper = shallowMount(TodoItem, {
      propsData: {
        todo: {
          ...exampleTodo,
        },
      },
      data: function () {
        return {
          editText: null,
          isEditing: false,
          todoDetails: null,
          showSpinner: false,
        }
      },

      stubs: ["router-link"],
    })

    await wrapper.setData({
      showSpinner: true,
    })

    expect(wrapper.classes()).toContain("disabled")
  })

  it("shows spinner when spinner is active", async () => {
    const wrapper = shallowMount(TodoItem, {
      propsData: {
        todo: {
          ...exampleTodo,
        },
      },
      data: function () {
        return {
          editText: null,
          isEditing: false,
          todoDetails: null,
          showSpinner: false,
        }
      },

      stubs: ["router-link"],
    })

    await wrapper.setData({
      showSpinner: true,
    })

    expect(wrapper.findComponent(SpinnerIcon).exists()).toBe(true)
  })

  it("shows only title when not in edit mode", () => {
    const todoTitle = "Some Title"

    const wrapper = shallowMount(TodoItem, {
      propsData: {
        todo: {
          ...exampleTodo,
          title: todoTitle,
        },
      },
      data: function () {
        return {
          editText: null,
          isEditing: false,
          todoDetails: null,
          showSpinner: true,
        }
      },

      stubs: ["router-link"],
    })

    expect(wrapper.find(".todo__header_title").text()).toContain(todoTitle)
  })

  it("shows Title: title when in detail mode", async () => {
    const todoTitle = "SomeTitle"
    const expectedTitle = `Title: ${todoTitle}`

    const wrapper = shallowMount(TodoItem, {
      propsData: {
        todo: {
          ...exampleTodo,
          title: todoTitle,
        },

        inDetailMode: true,
      },
      data: function () {
        return {
          editText: null,
          isEditing: false,
          todoDetails: null,
          showSpinner: true,
        }
      },

      stubs: ["router-link"],
    })

    expect(wrapper.find(".todo__header_title-detail > p").text()).toContain(
      expectedTitle
    )
  })

  it("shows only description when not in edit mode", async () => {
    const todoDescription = "Some Description"

    const wrapper = shallowMount(TodoItem, {
      propsData: {
        todo: {
          ...exampleTodo,
          desc: todoDescription,
        },
      },
      data: function () {
        return {
          editText: null,
          isEditing: false,
          todoDetails: null,
          showSpinner: true,
        }
      },

      stubs: ["router-link"],
    })

    expect(wrapper.find(".todo__header_desc").text()).toContain(todoDescription)
  })

  it("shows CreateTodo Component when in edit mode", async () => {
    const todoDescription = "Some Description"
    const expectedDescription = `Description: ${todoDescription}`

    const wrapper = shallowMount(TodoItem, {
      propsData: {
        todo: {
          ...exampleTodo,
          desc: todoDescription,
        },
        inDetailMode: false,
      },
      data: function () {
        return {
          editText: null,
          isEditing: false,
          todoDetails: null,
          showSpinner: true,
        }
      },

      stubs: ["router-link"],
    })

    await wrapper.setData({
      isEditing: true,
    })

    expect(wrapper.findComponent(CreateTodo).exists()).toBe(true)
  })

  it("emits delete event", async () => {
    const wrapper = shallowMount(TodoItem, {
      propsData: {
        todo: {
          ...exampleTodo,
        },
        inDetailMode: false,
      },
      data: function () {
        return {
          editText: null,
          isEditing: false,
          todoDetails: null,
          showSpinner: true,
        }
      },

      stubs: ["router-link"],
    })

    wrapper.vm.$emit("delete")

    expect(wrapper.emitted().delete).toBeTruthy()
  })
})
