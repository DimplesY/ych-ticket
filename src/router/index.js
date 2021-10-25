import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/Home"),
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("@/views/Search"),
  },
  {
    path: "/mine",
    name: "Mine",
    component: () => import("@/views/Mine"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/Register"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
