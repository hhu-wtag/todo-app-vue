import VueRouter from "vue-router"

import ListView from "@/pages/ListView.vue"
import DetailsVue from "@/pages/DetailsVue.vue"

const routes = [
  { path: "/", component: ListView },
  { name: "details", path: "/details/:id/:todo", component: DetailsVue },
]

const router = new VueRouter({
  mode: "history",
  routes,
})

export default router
