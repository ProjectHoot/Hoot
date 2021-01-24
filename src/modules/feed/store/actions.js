import api from "@/services/api";

export default {
  getDefaultPosts({ commit }) {
    return api.posts.get().then((posts) => {
      commit("setPosts", posts);

      return posts;
    });
  },

  getCommunityPosts({ commit }, id) {
    return api.communities.getPosts(id).then((posts) => {
      commit("setPosts", posts);

      return posts;
    });
  },
};
