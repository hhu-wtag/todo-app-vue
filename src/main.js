import Vue from "vue"
import VueRouter from "vue-router"
import App from "./App.vue"
import store from "./stores/store.js"
import router from "./router"

Vue.config.productionTip = false

Vue.use(VueRouter)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app")
