import { Api } from "./api";
import Post from "@/modules/feed/models/post";

export default new (class Auth extends Api {
  constructor() {
    super();
  }

  /** @returns {Promise<Post[]>} */
  get() {
    return this.axios.get(`${this.baseUrl}/posts`)
      .then(({ data }) => {
        return data.map(post => new Post(post));
      });
  }

  /**
   * @param {number} id
   * @returns {Promise<Post>}
   */
  getById(id) {
    return this.axios.get(`${this.baseUrl}/posts/${id}`)
      .then(({ data }) => {
        return new Post(data);
      });
  }
})();
