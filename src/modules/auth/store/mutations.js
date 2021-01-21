export default {
  /** @param {string} token */
  setToken(state, token) {
    state.token = token;
  },

  /** @param {User} user */
  setUsername(state, user) {
    state.user = user;
  }
}
