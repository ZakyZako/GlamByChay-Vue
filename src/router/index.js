import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home/Home.vue";
// import ProductPage from "../views/ProductPage/ProductPage.vue";
import "@/styles/reset.css";

Vue.use(VueRouter);

const routes = [
  // {
  //   name: "Header",
  //   component: Header,
  // },

  {
    path: "/",
    name: "Home",
    component: Home,
  },

  {
    path: "/product/:id",
    name: "product-page",
    component: () => import("../views/ProductPage/ProductPage.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
