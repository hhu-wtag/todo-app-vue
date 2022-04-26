import { shallowMount } from "@vue/test-utils"
import ModalDialogue from "@/components/ModalDialogue.vue"

test("On Confirm, ModalDialogue emits Cancel Event", async () => {
  const wrapper = shallowMount(ModalDialogue)

  wrapper.vm.$emit("confirm")

  await wrapper.vm.$nextTick()

  expect(wrapper.emitted().confirm).toBeTruthy()
})

test("On Cancel, ModalDialogue emits Cancel Event", async () => {
  const wrapper = shallowMount(ModalDialogue)

  wrapper.vm.$emit("cancel")

  await wrapper.vm.$nextTick()

  expect(wrapper.emitted().cancel).toBeTruthy()
})
