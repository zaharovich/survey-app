import { createRouter, createWebHistory } from "vue-router";
import Survey from "../views/Survey.vue";
import Results from "../views/Results.vue";

const routes = [
  {
    path: "/",
    redirect: "/survey",
  },
  {
    path: "/survey",
    name: "Survey",
    component: Survey,
  },
  {
    path: "/results",
    name: "Results",
    component: Results,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
