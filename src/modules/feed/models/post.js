import { formatDistance, isValid } from "date-fns";
import Author from "./author";
import Community from "@/modules/community/models/community";
import Reply from "./reply";

/**
 * @property {Author} author
 * @property {Community} community
 * @property {string} content_html
 * @property {string} content_text
 * @property {Date} created
 * @property {string} href
 * @property {number} id
 * @property {number} replies_count_total
 * @property {Reply[]} replies
 * @property {number} score
 * @property {string} title
 * @property {object} your_vote
 */
export default class Post {
  constructor({
    id,
    author,
    community,
    content_html,
    content_text,
    created,
    href,
    replies_count_total,
    replies,
    score,
    title,
    your_vote,
  }) {
    this.id = id;
    this.author = new Author(author || {});
    this.community = new Community(community || {});
    this.content_html = content_html;
    this.content_text = content_text;
    this.created = new Date(created);
    this.href = href;
    this.replies = replies ? replies.map((reply) => new Reply(reply)) : [];
    this.replies_count_total = replies_count_total;
    this.score = score;
    this.title = title;
    this.your_vote = your_vote;
  }

  /** @returns {string} */
  get createdDistance() {
    return isValid(this.created)
      ? formatDistance(this.created, new Date())
      : "";
  }
}
