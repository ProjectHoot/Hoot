export default {
  /** @param {string} token */
  setToken(state, token) {
    state.token = token;
    localStorage._token = token;
  },

  /** @param {User} user */
  setUser(state, user) {
    state.user = user;
  }
}
