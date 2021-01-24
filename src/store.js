import Vue from "vue";
import Vuex from "vuex";

import authStore from "@/modules/auth/store";
import feedStore from "@/modules/feed/store";
import communityStore from "@/modules/community/store";

import Vuetify from "./plugins/vuetify";

Vue.use(Vuex);

const $preferences = {
  state: {
    dark: true,
  },

  mutations: {
    setDarkState(state, dark) {
      state.dark = dark;
      Vuetify.framework.theme.dark = dark;
    },
  },

  namespaced: true,
};

export default new Vuex.Store({
  modules: {
    $auth: authStore,
    $feed: feedStore,
    $community: communityStore,
    $preferences,
  },
});
