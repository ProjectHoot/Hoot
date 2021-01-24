export default (store) => {
  store.subscribe((mutation, state) => {
    if (mutation.type === "$auth/setToken" && Boolean(state.$auth.token)) {
      store.dispatch("$auth/syncUser");
    }
  });
};
