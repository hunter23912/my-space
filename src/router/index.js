import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import UserProfile from "../views/UserProfile.vue";
import UserList from "../views/UserList.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import NotFound from "../views/NotFound.vue";

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/userlist/", name: "userlist", component: UserList },
  { path: "/userprofile/:userId/", name: "userprofile", component: UserProfile },
  { path: "/register/", name: "register", component: Register },
  { path: "/login/", name: "login", component: Login },
  { path: "/404/", name: "404", component: NotFound },
  { path: "/:catchAll(.*)", redirect: "/404/" },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
