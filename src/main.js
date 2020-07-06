import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import VueRouter from 'vue-router'

Vue.config.productionTip = false
Vue.use(require('vue-moment'));
Vue.use(VueRouter)

import PostShow from './views/PostShow.vue'
import Feed from './views/Feed.vue'
import store from './store'

// TODO: move to separate file/structure
const routes = [
  { path: '/', name: 'Feed', component: Feed },
  { path: '/posts/:postID', name:'PostShow', component: PostShow },
]

const router = new VueRouter({
  routes
})

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')


