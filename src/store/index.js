import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export const store = new Vuex.Store({
    plugins: [createPersistedState()],

    state: {
        Username: '',
        Token: '',
        Dark: true,
        LoggedIn: false,
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
        logout: function (state) {
            state.LoggedIn = false;
        },
        login: function (state) {
            state.LoggedIn = true;
        }
    },
})
