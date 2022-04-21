<template>
  <nav class="navBar">
    <div class="navBar__titleBox">
      <LogoIcon />
      <p class="navBar__titleBox_title">Todos</p>
    </div>
    <div class="navBar__searchBar">
      <input
        type="text"
        v-if="isSearchBarOpen"
        class="navBar__searchBar_input"
      />

      <div class="navBar__searchBar_logo btn" @click="onSearch">
        <SearchIcon />
      </div>
    </div>
  </nav>
</template>

<script>
import LogoIcon from "@/components/icons/LogoIcon"
import SearchIcon from "@/components/icons/SearchIcon"

export default {
  components: {
    LogoIcon,
    SearchIcon,
  },
  data() {
    return {
      isSearchBarOpen: false,
    }
  },

  methods: {
    onSearch() {
      this.isSearchBarOpen = !this.isSearchBarOpen
    },
  },
}
</script>

<style lang="scss">
.navBar {
  display: flex;
  padding: 15px 150px 15px 150px;
  justify-content: space-between;
  align-items: center;
  background: $bg-secondary;
  border-bottom: 1px solid #dde2ff;
}

.navBar__titleBox {
  display: flex;
  align-items: center;

  &_title {
    font-size: 36px;
    font-weight: bold;
    color: $text-accent;
    margin-left: 14px;
  }
}

.navBar__searchBar {
  display: flex;

  &_input {
    border-radius: 5px;
    border: 3px solid $border-primary;
  }

  &_logo {
    display: inline-flex;
    align-items: center;
    margin-left: 18px;
  }
}
</style>
