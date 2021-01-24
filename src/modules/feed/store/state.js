import Community from "@/modules/community/models/community";

export default {
  /** @type {Post[]} */
  posts: [],
  /** @type {Community} */
  community: new Community({}),
  replyingToId: -1,
};
