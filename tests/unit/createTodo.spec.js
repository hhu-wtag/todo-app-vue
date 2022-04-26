import { shallowMount } from "@vue/test-utils"
import CreateTodo from "@/components/CreateTodo.vue"

test("TitleInput is updating", async () => {
  const wrapper = shallowMount(CreateTodo, {
    data: function () {
      return {
        title: null,
        description: null,
      }
    },
  })

  const titleInput = wrapper.find(".createTodo__inputBox_titleInput")

  const title = "Some Todo"

  await titleInput.setValue(title)

  expect(titleInput.element.value).toBe(title)
})

test("DescInput is updating", async () => {
  const wrapper = shallowMount(CreateTodo, {
    data: function () {
      return {
        title: null,
        description: null,
      }
    },
  })

  const descInput = wrapper.find(".createTodo__inputBox_descInput")

  const desc = "Some Todo"

  await descInput.setValue(desc)

  expect(descInput.element.value).toBe(desc)
})

test("Can't Add empty input", async () => {
  const wrapper = shallowMount(CreateTodo, {
    data: function () {
      return {
        title: null,
        description: null,
        isTitleError: false,
        isDescError: false,
      }
    },
  })

  const titleInput = wrapper.find(".createTodo__inputBox_titleInput")
  const titleError = wrapper.find(".createTodo__inputBox_error")

  await titleInput.setValue("")

  expect(titleError.exists()).toBe(true)
})

test("Can't Add empty description", async () => {
  const wrapper = shallowMount(CreateTodo, {
    data: function () {
      return {
        title: null,
        description: null,
        isTitleError: false,
        isDescError: false,
      }
    },
  })

  const descInput = wrapper.find(".createTodo__inputBox_descInput")
  const descError = wrapper.find(".createTodo__Desc_error")

  await descInput.setValue("")

  expect(descError.exists()).toBe(true)
})

test("Show Add Button in non Detail Mode", async () => {
  const wrapper = shallowMount(CreateTodo, {
    data: function () {
      return {
        title: null,
        description: null,
        isTitleError: false,
        isDescError: false,
      }
    },
    propsData: {
      inDetailMode: false,
    },
  })

  expect(wrapper.find("#createTodo__add").exists()).toBe(true)
})

test("Show Update Button in Detail Mode", async () => {
  const wrapper = shallowMount(CreateTodo, {
    data: function () {
      return {
        title: null,
        description: null,
        isTitleError: false,
        isDescError: false,
      }
    },
    propsData: {
      inDetailMode: true,
      todoItem: {
        title: "Some Title",
        description: "Some description",
      },
    },
  })

  expect(wrapper.find("#createTodo__update").exists()).toBe(true)
})

test("onCancel event emitted", async () => {
  const wrapper = shallowMount(CreateTodo, {
    data: function () {
      return {
        title: null,
        description: null,
        isTitleError: false,
        isDescError: false,
      }
    },
    propsData: {
      inDetailMode: false,
    },
  })

  await wrapper.find(".createTodo__button_cancel").trigger("click")

  expect(wrapper.emitted()).toBeTruthy()
})

test("onCancel event called", async () => {
  const wrapper = shallowMount(CreateTodo, {
    data: function () {
      return {
        title: null,
        description: null,
        isTitleError: false,
        isDescError: false,
      }
    },
    propsData: {
      inDetailMode: false,
    },
  })

  await wrapper.find(".createTodo__button_cancel").trigger("click")

  expect(wrapper.vm.onCancel).toHaveBeenCalledWith({
    event: {
      target: {},
    },
  })
})
