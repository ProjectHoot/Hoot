import Vue from 'vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router'
import axios from "axios"
import Vuex from 'vuex'
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'




Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueMoment, {
    moment,
});

import PostShow from './views/PostShow.vue'
import Feed from './views/Feed.vue'
import App from './App.vue'
import Community from './views/Community.vue'
import {store} from './store'
import Profile from './views/Profile.vue'


// TODO: move to separate file/structure
const routes = [
    {path: '/', name: 'Feed', component: Feed},
//  { path: '/r/:host/:community/', name: 'Community', component: ShowCommunity },
    {path: '/p/posts/:postID', name: 'PostShow', component: PostShow},
    {path: '/p/comments/:commentID', name: 'PostShowExpandedComments', component: PostShow},
    {path: '/communities', name: 'Community List', component: Community},
    {path: '/c/:communityID/:communityName', name: 'Community', component: Feed},
    {path: '/me', name: 'My Profile', component: Profile},

]

const router = new VueRouter({
    base: '/',
    mode: 'history',
    linkActiveClass: 'active',
    routes
})

router.beforeEach((to, from, next) => {
    document.title = "Hoot: " + to.name;
    next();
});

if (window.location.hostname == "localhost" || window.location.hostname == "dev.goldandblack.xyz")
    Vue.prototype.$LOTIDE = "https://hoot.goldandblack.xyz/api";
else
    Vue.prototype.$LOTIDE = "/api";

axios.interceptors.request.use(function (config) {
        const token = store.state.Token;

        if (token != null) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    }
)
Vue.prototype.$http = axios;
let postindex = 0;
Vue.prototype.$index = function () {
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


