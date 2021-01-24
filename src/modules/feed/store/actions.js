import api from "@/services/api";

export default {
  /** @returns {Promise<Post[]>} */
  getDefaultPosts({ commit }) {
    return api.posts.get().then((posts) => {
      commit("setPosts", posts);

      return posts;
    });
  },

  /**
   * @param {number} id
   * @returns {Promise<Post[]>}
   */
  getCommunityPosts({ commit }, id) {
    return api.communities.getPosts(id).then((posts) => {
      commit("setPosts", posts);

      return posts;
    });
  },

  /**
   * @param {number} id
   * @returns {Promise<Community>}
   */
  getCommunity({ commit }, id) {
    return api.communities.getById(id).then((community) => {
      commit("setCommunity", community);

      return community;
    });
  },
};
