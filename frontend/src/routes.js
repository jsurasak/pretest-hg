import { createRouter, createWebHashHistory } from "vue-router";
import FormUnit from "@/page/FormUnit.vue";
import Home from "@/page/Home.vue";
import ListUnit from "@/page/ListUnit.vue";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/list",
    component: ListUnit,
  },
  {
    path: "/add",
    component: FormUnit,
  },
  {
    path: "/:type/:id/:typeform",
    component: FormUnit,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
