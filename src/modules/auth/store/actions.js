import api from "@/services/api";

export default {
  /** @param {LoginCredentials} credentials */
  login({ commit }, credentials) {
    api.auth.login(credentials).then((loginResponse) => {
      commit("setToken", loginResponse.token);
      commit("setUser", loginResponse.user);
    });
  },

  /** @param {RegistrationCredentials} credentials */
  signUp({ commit }, credentials) {
    if (!credentials.isValid) {
      return credentials.validationErrors;
    }

    api.auth.signUp(credentials).then((loginResponse) => {
      commit("setToken", loginResponse.token);
      commit("setUsername", credentials.username);
    });
  },

  logout({ commit }) {
    api.auth.logout().then(() => {
      commit("setToken", "");
      commit("setUsername", "");
    });
  },
};
