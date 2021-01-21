import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import authStore from "@/modules/auth/store";
import feedStore from "@/modules/feed/store";

Vue.use(Vuex);

export const store = new Vuex.Store({
  plugins: [createPersistedState()],

  state: {
    Username: "",
    Token: "",
    Dark: true,
  },
  mutations: {
    setUsername: function (state, v) {
      state.Username = v;
    },
    setToken: function (state, v) {
      state.Token = v;
    },
    setDark: function (state, v) {
      state.Dark = v;
    },
  },
});

export default new Vuex.Store({
  modules: {
    $auth: authStore,
    $feed: feedStore
  }
});
