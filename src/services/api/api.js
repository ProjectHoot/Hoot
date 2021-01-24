import axios from "axios";

export default {
  install: (Vue) => {
    axios.interceptors.request.use((config) => {
      const token =
        Vue.prototype.$store.state.$auth.token || localStorage._token;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });

    axios.interceptors.response.use(
      (response) => response,
      (e) => {
        const currentToken = Vue.prototype.$store.state.$auth.token;

        if (e.response.status === 401 && Boolean(currentToken)) {
          Vue.prototype.$store.commit("$auth/setToken", "");
        }
      }
    );
  },
};

export class Api {
  constructor() {
    this.baseUrl = "https://hoot.goldandblack.xyz/api/unstable";
    this.axios = axios;
  }
}
