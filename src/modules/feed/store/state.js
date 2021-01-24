import Community from "@/modules/community/models/community";
import Post from "@/modules/feed/models/post";

export default {
  /** @type {Post[]} */
  posts: [],
  /** @type {Post} */
  post: new Post({}),
  /** @type {Community} */
  community: new Community({}),
  replyingToId: -1,
};
