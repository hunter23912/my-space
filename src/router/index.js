import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import UserProfileView from "../views/UserProfileView.vue";
import UserListView from "../views/UserListView.vue";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";
import NotFoundView from "../views/NotFoundView.vue";

const routes = [
  { path: "/", name: "home", component: HomeView },
  { path: "/userlist/", name: "userlist", component: UserListView },
  { path: "/userprofile/:userId/", name: "userprofile", component: UserProfileView },
  { path: "/register/", name: "register", component: RegisterView },
  { path: "/login/", name: "login", component: LoginView },
  { path: "/404/", name: "404", component: NotFoundView },
  { path: "/:catchAll(.*)", redirect: "/404/" },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
