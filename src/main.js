import Vue from "vue";
import vuetify from "./plugins/vuetify";
import VueRouter from "vue-router";
import axios from "axios";
import Vuex from "vuex";
import Api from "@/services/api/api";

Vue.config.productionTip = false;
Vue.use(require("vue-moment"));
Vue.use(VueRouter);
Vue.use(Api);
Vue.use(Vuex);

import PostShow from "./views/PostShow.vue";
import Feed from "@/modules/feed/views/Feed";
import App from "./App.vue";
import Communities from "@/modules/community/views/Communities";
import store from "./store";
import Profile from "./views/Profile.vue";

import EventBus from "@/EventBus";
import Post from "@/modules/feed/views/Post";

Vue.prototype.$store = store;
Vue.prototype.$eventBus = EventBus;

import router from "./router";

/*router.beforeEach((to, from, next) => {
  document.title = "Hoot: " + to.name;
  next();
});*/

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

const token = localStorage._token ? localStorage._token : null;

if (token) {
  store.commit("$auth/setToken", token);
}

new Vue({
  render: (h) => h(App),
  store,
  vuetify,
  router,
  axios,
}).$mount("#app");
