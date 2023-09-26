import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/messages",
  },
  {
    path: "/messages",
    component: () => import("@/views/messages/index.vue"),
  },
  {
    path: "/messages/:id",
    component: () => import("@/views/messages/_id/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
