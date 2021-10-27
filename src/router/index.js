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
  {
    path: "/ticket/:id",
    name: "Ticket",
    component: () => import("@/views/Ticket"),
    props: true
  },
  {
    path: "/myorder",
    name: "MyOrder",
    component: () => import("@/views/MyOrder")
  },
  {
    path: "/user",
    name: "User",
    component: () => import("@/views/User")
  },
  {
    path: "/count",
    name: "Count",
    component: () => import("@/views/Count")
  },
  {
    path: "/systicket",
    name: "SysTicket",
    component: () => import("@/views/SysTicket")
  },
];

const router = new VueRouter({
  routes,
});

export default router;
