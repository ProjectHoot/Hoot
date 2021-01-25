import Vue from "vue";
import Vuex from "vuex";

import authStore from "@/modules/auth/store";
import feedStore from "@/modules/feed/store";
import communityStore from "@/modules/community/store";

import syncUserPlugin from "@/modules/auth/store/plugins/user.sync";

import Vuetify from "./plugins/vuetify";

Vue.use(Vuex);

const $preferences = {
  state: {
    dark: localStorage._dark ? +localStorage._dark : true,
  },

  mutations: {
    setDarkState(state, dark) {
      state.dark = dark;
      Vuetify.framework.theme.dark = dark;
      localStorage._dark = +dark;
    },
  },

  namespaced: true,
};

const store = new Vuex.Store({
  plugins: [syncUserPlugin],
  modules: {
    $auth: authStore,
    $feed: feedStore,
    $community: communityStore,
    $preferences,
  },
});

export default store;
