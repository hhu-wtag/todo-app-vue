import VueRouter from "vue-router"

import MainVue from "@/pages/MainVue.vue"
import DetailsVue from "@/pages/DetailsVue.vue"

const routes = [
  { path: "/", component: MainVue },
  { name: "details", path: "/details", component: DetailsVue, props: true },
]

const router = new VueRouter({
  mode: "history",
  routes,
})

export default router
