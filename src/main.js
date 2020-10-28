import Vue from 'vue'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import VueRouter from 'vue-router'
import VueCookies from 'vue-cookies'
import axios from "axios"
import Vuex from 'vuex'


Vue.config.productionTip = false
Vue.use(require('vue-moment'));
Vue.use(VueRouter)
Vue.use(VueCookies);
Vue.use(axios);
Vue.use(Vuex);

import PostShow from './views/PostShow.vue'
import Feed from './views/Feed.vue'
import App from './App.vue'
import Community from './views/Community.vue'
import { store } from './store'


// TODO: move to separate file/structure
const routes = [
  { path: '/', name: 'Feed', component: Feed },
  { path: '/r/:host/:community/', name: 'Community', component: Community },
  { path: '/p/posts/:postID', name:'PostShow', component: PostShow },
  { path: '/p/comments/:commentID', name:'PostShowExpandedComments', component: PostShow },

]

const router = new VueRouter({
  base: '/',
  mode: 'history',
  linkActiveClass: 'active',
  routes
})

Vue.prototype.$LOTIDE = "https://hoot.goldandblack.xyz/api";

axios.interceptors.request.use(function(config) {
  const token =  store.state.Token;

  if ( token != null ) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}
)
Vue.prototype.$http = axios;
var postindex=0;
Vue.prototype.$index=function() {
  postindex++;
  return postindex;
}

new Vue({
  vuetify,
  router,
  axios,
  store,
  render: h => h(App)
}).$mount('#app')


