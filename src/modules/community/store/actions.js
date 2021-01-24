import api from "@/services/api";

export default {
  getCommunities({ commit }) {
    return api.communities.get().then((communities) => {
      commit("setCommunities", communities);

      return communities;
    });
  },
};
