import api from "@/services/api";

export default {
  /**
   * @param {boolean} includeYour
   * @returns {Promise<Community[]>}
   */
  getCommunities({ commit }, includeYour) {
    return api.communities.get(includeYour).then((communities) => {
      commit("setCommunities", communities);

      return communities;
    });
  },
};
