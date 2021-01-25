import { findReplyById } from "@/modules/feed/store/helpers";

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

  /**
   * @param {string} type
   * @param {number} id
   */
  setReplyingToState(state, { type, id }) {
    state.replyingTo = {
      type,
      id,
    };
  },

  /**
   * @param {string} type
   * @param {Post} post
   * @param {Reply} reply
   */
  addReply(state, { type, post, reply }) {
    if (state.replyingTo.type === "post") {
      state.post.replies = [reply, ...state.post.replies];
    } else {
      const oldReply = findReplyById(state.post.replies, state.replyingTo.id);
      oldReply.replies = [reply, ...oldReply.replies];
    }
  },

  /**
   * @param {number} id
   * @param {number} score
   */
  setReplyScore(state, { id, score }) {
    const reply = findReplyById(state.post.replies, id);

    if (reply) {
      reply.score = score;
    }
  },

  /**
   * @param {number} score
   */
  setPostScore(state, score) {
    if (state.post) {
      state.post.score = score;
    }
  },

  /**
   * @param {number} id
   * @param {boolean} yourVote
   */
  setReplyYourVote(state, { id, yourVote }) {
    const reply = findReplyById(state.post.replies, id);

    if (reply) {
      reply.your_vote = yourVote ? {} : null;
    }
  },

  /**
   * @param {boolean} yourVote
   */
  setPostYourVote(state, yourVote) {
    if (state.post) {
      state.post.your_vote = yourVote ? {} : null;
    }
  },
};
