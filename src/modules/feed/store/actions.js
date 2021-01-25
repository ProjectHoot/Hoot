import api from "@/services/api";
import Reply from "../models/reply";

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
   * @param {User} user
   * @param {Post} post
   * @param {string} reply
   * @returns {Promise<PostReplyResponse>}
   */
  submitReply({ commit, state }, { author, post, reply }) {
    let action;
    const type = state.replyingTo.type;

    if (type === "post") {
      action = api.posts.replyToPost(state.replyingTo.id, reply);
    } else {
      action = api.posts.replyToReply(state.replyingTo.id, reply);
    }

    action.then((postReplyResponse) => {
      const newReply = new Reply({
        id: postReplyResponse.id,
        content_text: null,
        content_html: reply,
        attachments: [],
        created: new Date().toISOString(),
        score: 0,
        author: author,
      });

      commit("addReply", { type, post, reply: newReply });
    });

    return action;
  },

  /**
   * @param {Reply} reply
   */
  upvoteReply({ commit }, reply) {
    return api.posts.upvoteReply(reply.id).then(() => {
      commit("setReplyScore", { id: reply.id, score: reply.score + 1 });
    });
  },

  /**
   * @param {Reply} reply
   */
  downvoteReply({ commit }, reply) {
    return api.posts.downvoteReply(reply.id).then(() => {
      commit("setReplyScore", { id: reply.id, score: reply.score - 1 });
    });
  },
};
