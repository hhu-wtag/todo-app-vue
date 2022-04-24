import VueRouter from "vue-router"

import ListView from "@/pages/ListView"
import DetailView from "@/pages/DetailView"

const routes = [
  { path: "/", component: ListView },
  { name: "details", path: "/details/:id", component: DetailView },
]

const router = new VueRouter({
  mode: "history",
  routes,
})

export default router
