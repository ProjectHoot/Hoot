import Vue from "vue";
import vuetify from "./plugins/vuetify";
import VueRouter from "vue-router";
import axios from "axios";
import Vuex from "vuex";

Vue.config.productionTip = false;
Vue.use(require("vue-moment"));
Vue.use(VueRouter);
Vue.use(Vuex);

import PostShow from "./views/PostShow.vue";
import Feed from "@/modules/feed/views/Feed";
import App from "./App.vue";
import Community from "./views/Community.vue";
import store from "./store";
import Profile from "./views/Profile.vue";

import EventBus from "@/EventBus";
import Post from "@/modules/feed/views/Post";

Vue.prototype.$store = store;
Vue.prototype.$eventBus = EventBus;

// TODO: move to separate file/structure
const routes = [
  { path: "/", name: "Feed", component: Feed },
  //  { path: '/r/:host/:community/', name: 'Community', component: ShowCommunity },
  { path: "/p/posts/:id", name: "Post", component: Post },
  {
    path: "/p/comments/:commentID",
    name: "PostShowExpandedComments",
    component: PostShow,
  },
  { path: "/communities", name: "Community List", component: Community },
  {
    path: "/c/:communityID/:communityName",
    name: "Community",
    component: Feed,
  },
  { path: "/me", name: "My Profile", component: Profile },
];

const router = new VueRouter({
  base: "/",
  mode: "history",
  linkActiveClass: "active",
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = "Hoot: " + to.name;
  next();
});

if (
  window.location.hostname == "localhost" ||
  window.location.hostname == "dev.goldandblack.xyz"
)
  Vue.prototype.$LOTIDE = "https://hoot.goldandblack.xyz/api";
else Vue.prototype.$LOTIDE = "/api";

axios.interceptors.request.use(function (config) {
  const token = store.state.Token;

  if (token != null) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

Vue.prototype.$http = axios;

let postIndex = 0;

Vue.prototype.$index = () => {
  postIndex++;
  return postIndex;
};

new Vue({
  render: (h) => h(App),
  store,
  vuetify,
  router,
  axios,
}).$mount("#app");
