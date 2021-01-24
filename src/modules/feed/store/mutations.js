export default {
  /** @param {Post[]} posts */
  setPosts(state, posts) {
    state.posts = posts;
  },

  /** @param {Post} post */
  setPost(state, post) {
    state.post = post;
  },

  /** @param {Community} community */
  setCommunity(state, community) {
    state.community = community;
  },

  /** @param {number} replyingToId */
  setReplyingToId(state, replyingToId) {
    state.replyingToId = replyingToId;
  },
};
