import { createRouter, createWebHistory } from "vue-router";
import SurveyForm from "../views/Survey.vue";
import SurveyResults from "../views/Results.vue";

const routes = [
  { path: "/", name: "SurveyForm", component: SurveyForm },
  { path: "/results", name: "SurveyResults", component: SurveyResults },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
