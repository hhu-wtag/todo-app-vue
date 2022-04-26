import { mount } from "@vue/test-utils"
import TodoTitle from "@/components/TodoTitle.vue"

test("Shows text body", () => {
  const todoText = "This is a Todo"

  const wrapper = mount(TodoTitle, {
    propsData: {
      done: false,
      title: todoText,
    },
  })

  expect(wrapper.text()).toContain(todoText)
})

test("Contains done class when done prop is true", () => {
  const todoText = "This is a Todo"

  const wrapper = mount(TodoTitle, {
    propsData: {
      done: true,
      title: todoText,
    },
  })

  expect(wrapper.attributes("class")).toContain("done")
})
