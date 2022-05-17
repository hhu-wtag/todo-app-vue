import { shallowMount } from "@vue/test-utils"
import CustomBadge from "@/components/CustomBadge.vue"
import UpIcon from "@/components/icons/UpIcon.vue"
import DownIcon from "@/components/icons/DownIcon.vue"
import EqualIcon from "@/components/icons/EqualIcon.vue"

describe("@Component/CustomBadge", () => {
  it("Shows Up Arrow Icon when priority is high", () => {
    const wrapper = shallowMount(CustomBadge, {
      propsData: {
        code: "high",
      },
    })

    expect(wrapper.findComponent(UpIcon).exists()).toBe(true)
  })

  it("Shows Equal Arrow Icon when priority is mid", () => {
    const wrapper = shallowMount(CustomBadge, {
      propsData: {
        code: "mid",
      },
    })

    expect(wrapper.findComponent(EqualIcon).exists()).toBe(true)
  })

  it("Shows Down Arrow Icon when priority is high", () => {
    const wrapper = shallowMount(CustomBadge, {
      propsData: {
        code: "low",
      },
    })
    expect(wrapper.findComponent(DownIcon).exists()).toBe(true)
  })
})
