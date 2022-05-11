<template>
  <nav class="navBar">
    <div class="navBar__titleBox">
      <LogoIcon />
      <p class="navBar__titleBox_title">Todos</p>
    </div>
    <div class="navBar__searchBar">
      <input
        v-show="!inDetailPage"
        type="text"
        v-if="isSearchBarOpen"
        class="navBar__searchBar_input"
        v-model="searchText"
      />

      <div
        v-if="!inDetailPage"
        class="navBar__searchBar_logo btn"
        @click="toggleSearchBar"
      >
        <SearchIcon />
      </div>

      <div v-else>
        <div class="detail__goback">
          <router-link to="/">Go Back</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import LogoIcon from "@/components/icons/LogoIcon"
import SearchIcon from "@/components/icons/SearchIcon"
import { SET_SEARCH_STATE } from "@/stores/mutation-types"
import { debounce } from "@/utils/debounce"

export default {
  components: {
    LogoIcon,
    SearchIcon,
  },
  data() {
    return {
      isSearchBarOpen: false,
      searchText: null,
      inDetailPage: false,
    }
  },

  created() {
    if (this.$router.history.current.name === "details") {
      this.inDetailPage = true
    }
  },

  watch: {
    searchText: debounce(async function () {
      this.$store.commit(SET_SEARCH_STATE, { isSearching: true })
      await this.$store.dispatch("getSearchData", {
        searchText: this.searchText,
      })

      this.$store.commit(SET_SEARCH_STATE, { isSearching: false })
    }, 500),

    $route: function (to) {
      if (to.name === "details") {
        this.inDetailPage = true
      } else {
        this.inDetailPage = false
      }
    },
  },
  methods: {
    toggleSearchBar() {
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

.detail__goback {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 1rem;

  & > a {
    background: $text-primary;
    color: white;
    padding: 8px 12px;
    border-radius: 5px;
  }
  & > a:hover {
    background: #232323;
  }
}
</style>
