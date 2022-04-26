import { mount } from "@vue/test-utils"
import ToolTip from "@/components/ToolTip.vue"

test("Shows text body inside tooltip", () => {
  const tooltipBody = "Done"

  const wrapper = mount(ToolTip, {
    propsData: {
      body: tooltipBody,
    },
  })

  expect(wrapper.text()).toContain(tooltipBody)
})
