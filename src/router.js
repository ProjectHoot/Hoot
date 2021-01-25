import VueRouter from "vue-router";
import feedRoutes from "@/modules/feed/router";
import communityRoutes from "@/modules/community/router";
import Profile from "@/views/Profile";

const routes = [
  ...feedRoutes,
  ...communityRoutes,
  { path: "/me", name: "My Profile", component: Profile },
];

export default new VueRouter({
  base: "/",
  mode: "history",
  linkActiveClass: "active",
  routes,
});
