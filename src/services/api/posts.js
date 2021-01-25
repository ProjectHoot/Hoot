import { Api } from "./api";
import Post from "@/modules/feed/models/post";
import PostReplyResponse from "@/modules/feed/models/postReplyResponse";

export default new (class Auth extends Api {
  constructor() {
    super();
  }

  /** @returns {Promise<Post[]>} */
  get() {
    return this.axios.get(`${this.baseUrl}/posts`).then(({ data }) => {
      return data.map((post) => new Post(post));
    });
  }

  /**
   * @param {number} id
   * @returns {Promise<Post>}
   */
  getById(id) {
    return this.axios.get(`${this.baseUrl}/posts/${id}`).then(({ data }) => {
      return new Post(data);
    });
  }

  /**
   * @param {number} id
   * @param {string} content_markdown
   * @returns {Promise<PostReplyResponse>}
   */
  replyToReply(id, content_markdown) {
    return this.axios
      .post(`${this.baseUrl}/comments/${id}/replies`, {
        content_markdown,
      })
      .then(({ data }) => {
        return new PostReplyResponse(data);
      });
  }

  /**
   * @param {number} id
   * @param {string} content_markdown
   * @returns {Promise<PostReplyResponse>}
   */
  replyToPost(id, content_markdown) {
    return this.axios
      .post(`${this.baseUrl}/posts/${id}/replies`, {
        content_markdown,
      })
      .then(({ data }) => {
        return new PostReplyResponse(data);
      });
  }

  /**
   * @param {number} id
   * @returns {Promise<*>}
   */
  upvoteReply(id) {
    return this.axios.put(`${this.baseUrl}/comments/${id}/your_vote`);
  }

  /**
   * @param {number} id
   * @returns {Promise<*>}
   */
  downvoteReply(id) {
    return this.axios.delete(`${this.baseUrl}/comments/${id}/your_vote`);
  }
})();
