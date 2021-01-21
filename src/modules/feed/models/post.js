import Author from "./author";
import Community from "./community";

/**
 * @property {Author} author
 * @property {Community} community
 * @property {string} content_html
 * @property {string} content_text
 * @property {string} created
 * @property {string} href
 * @property {number} id
 * @property {number} replies_count_total
 * @property {number} score
 * @property {string} title
 */
export default class Post {
  constructor({
    author,
    community,
    content_html,
    content_text,
    created,
    href,
    id,
    replies_count_total,
    score,
    title,
  }) {
    this.author = new Author(author || {});
    this.community = new Community(community || {});
    this.content_html = content_html;
    this.content_text = content_text;
    this.created = created;
    this.href = href;
    this.id = id;
    this.replies_count_total = replies_count_total;
    this.score = score;
    this.title = title;
  }
}
