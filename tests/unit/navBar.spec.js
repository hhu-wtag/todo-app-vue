import { mount, shallowMount } from "@vue/test-utils"
import NavBar from "@/components/NavBar.vue"

test("Show search bar when isSearchBarOpen is true", async () => {
  const wrapper = shallowMount(NavBar, {
    mocks: {
      $router: {
        history: {
          current: {
            name: undefined,
          },
        },
      },
    },
    data: function () {
      return {
        isSearchBarOpen: true,
      }
    },
  })

  const navSearchBar = wrapper.find(".navBar__searchBar")
  const button = navSearchBar.find(".navBar__searchBar_logo")

  await button.trigger("click")

  expect(navSearchBar.find(".navBar__searchBar_input").exists()).toBe(true)
})

test("When in details route, inDetailPage is true", async () => {
  const wrapper = shallowMount(NavBar, {
    mocks: {
      $router: {
        history: {
          current: {
            name: "details",
          },
        },
      },
    },
    data: function () {
      return {
        isSearchBarOpen: true,
        inDetailPage: false,
      }
    },
    stubs: ["router-link"],
  })

  expect(wrapper.vm.inDetailPage).toBe(true)
})

test("Sets searchbar input text", async () => {
  const wrapper = shallowMount(NavBar, {
    mocks: {
      $router: {
        history: {
          current: {
            name: undefined,
          },
        },
      },
    },
    data: function () {
      return {
        isSearchBarOpen: true,
        searchText: null,
      }
    },
  })

  const searchText = "Some Todo"

  const navSearchBarInput = wrapper.find(".navBar__searchBar_input")

  await navSearchBarInput.setValue(searchText)

  expect(navSearchBarInput.element.value).toBe(searchText)
})
