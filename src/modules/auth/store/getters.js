export default {
  loggedIn: (state) => {
    return Boolean(state.token);
  },
};
