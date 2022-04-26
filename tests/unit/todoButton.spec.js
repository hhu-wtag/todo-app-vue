// Import the `mount()` method from Vue Test Utils
import { mount } from "@vue/test-utils"
import TodoButton from "@/components/TodoButton.vue"

test("Contains class btn btn-action", () => {
  // mount() returns a wrapped Vue component we can interact with
  const wrapper = mount(TodoButton)

  expect(wrapper.attributes("class")).toContain("btn btn-action")
})

test("Emits click event", async () => {
  // mount() returns a wrapped Vue component we can interact with
  const wrapper = mount(TodoButton)

  wrapper.vm.$emit("click")

  await wrapper.vm.$nextTick()

  expect(wrapper.emitted().click).toBeTruthy()
})
