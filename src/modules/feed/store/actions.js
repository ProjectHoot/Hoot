import api from "@/services/api";
import { findReplyById } from "@/modules/feed/store/helpers";

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
   * @returns {Promise<Post>}
   */
  getPost({ commit }, id) {
    return api.posts.getById(id).then((post) => {
      commit("setPost", post);

      return post;
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

  /**
   * @param {Post} post
   * @param {string} reply
   * @returns {Promise<unknown>}
   */
  submitReply({ state }, { post, reply }) {
    console.log(findReplyById(post.replies, state.replyingToId).content_html);
    return new Promise((r) => r());
    // return api.posts.replyToReply(state.replyingToId, reply);
  },
};
