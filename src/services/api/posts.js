import { Api } from "./api";
import Post from "@/modules/feed/models/post";

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
   * @returns {Promise<AxiosResponse<any>>}
   */
  replyToReply(id, content_markdown) {
    return this.axios.post(`${this.baseUrl}/comments/${id}/replies`, {
      content_markdown,
    });
  }
})();
