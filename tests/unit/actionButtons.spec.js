import { shallowMount } from "@vue/test-utils"
import ActionButtons from "@/components/ActionButtons.vue"

const exampleTodo = {
  title: "Lorem",
  description: "Lorem ipsum set amit dolor",
  id: "sadfkasdfkajdfjadsf",
  done: false,
}

describe("@/compoenents/ActionButtons.vue", () => {
  test("Emits done event", async () => {
    const wrapper = shallowMount(ActionButtons, {
      propsData: {
        todo: exampleTodo,
      },
    })

    wrapper.vm.$emit("done")

    await wrapper.vm.$nextTick()

    expect(wrapper.emitted().done).toBeTruthy()
  })

  test("Emits delete event", async () => {
    const wrapper = shallowMount(ActionButtons, {
      propsData: {
        todo: exampleTodo,
      },
    })

    wrapper.vm.$emit("delete")

    await wrapper.vm.$nextTick()

    expect(wrapper.emitted().delete).toBeTruthy()
  })

  test("Emits delete event", async () => {
    const wrapper = shallowMount(ActionButtons, {
      propsData: {
        todo: exampleTodo,
      },
    })

    wrapper.vm.$emit("delete")

    await wrapper.vm.$nextTick()

    expect(wrapper.emitted().delete).toBeTruthy()
  })

  test("Emits cancel event", async () => {
    const wrapper = shallowMount(ActionButtons, {
      propsData: {
        todo: exampleTodo,
      },
    })

    wrapper.vm.$emit("cancel")

    await wrapper.vm.$nextTick()

    expect(wrapper.emitted().cancel).toBeTruthy()
  })

  test("Shows done button", async () => {
    const wrapper = shallowMount(ActionButtons, {
      propsData: {
        todo: {
          ...exampleTodo,
        },
        isEditing: false,
        inDetailMode: false,
      },
    })

    expect(wrapper.find("#doneButton").exists()).toBe(true)
  })

  test("Shows edit button in detailMode", async () => {
    const wrapper = shallowMount(ActionButtons, {
      propsData: {
        todo: {
          ...exampleTodo,
        },
        isEditing: false,
        inDetailMode: true,
      },
    })

    expect(wrapper.find("#editButton").exists()).toBe(true)
  })

  test("Shows cancel button in editing mode", async () => {
    const wrapper = shallowMount(ActionButtons, {
      propsData: {
        todo: {
          ...exampleTodo,
        },
        isEditing: true,
        inDetailMode: true,
      },
    })

    expect(wrapper.find("#cancelButton").exists()).toBe(true)
  })
})
