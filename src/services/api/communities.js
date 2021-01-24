import { Api } from "./api";
import Community from "@/modules/community/models/community";
import Post from "@/modules/feed/models/post";

export default new (class Auth extends Api {
  constructor() {
    super();
  }

  /**
   * @param {boolean} includeYour
   * @returns {Promise<Community[]>}
   */
  get(includeYour) {
    return this.axios
      .get(
        `${this.baseUrl}/communities${includeYour ? "?include_your=true" : ""}`
      )
      .then(({ data }) => {
        return data.map((community) => new Community(community));
      });
  }

  /**
   * @param {number} id
   * @returns {Promise<Community>}
   */
  getById(id) {
    return this.axios
      .get(`${this.baseUrl}/communities/${id}`)
      .then(({ data }) => {
        return new Community(data);
      });
  }

  /** @returns {Promise<Post[]>} */
  getPosts(id) {
    return this.axios
      .get(`${this.baseUrl}/communities/${id}/posts`)
      .then(({ data }) => {
        return data.map((post) => new Post(post));
      });
  }
})();
