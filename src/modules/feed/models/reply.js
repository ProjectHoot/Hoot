/**
 * @property {number} id
 * @property {string} content_text
 * @property {string} content_html
 * @property {object} attachments
 * @property {object} author
 * @property {Date} created
 * @property {boolean} deleted
 * @property {boolean} local
 * @property {Reply[]} replies
 * @property {boolean} has_replies
 * @property {number} score
 * @property {object} your_vote
 * @property {boolean} collapsed
 * @property {string} createdDistance
 */
import Author from "./author";
import { formatDistance, isValid } from "date-fns";

export default class Reply {
  constructor({
    id,
    content_text,
    content_html,
    attachments,
    author,
    created,
    deleted,
    local,
    replies,
    has_replies,
    score,
    your_vote,
  }) {
    this.id = id;
    this.content_text = content_text;
    this.content_html = content_html;
    this.attachments = attachments;
    this.author = new Author(author);
    this.created = new Date(created);
    this.deleted = deleted;
    this.local = local;
    this.replies = replies ? replies.map((reply) => new Reply(reply)) : [];
    this.has_replies = has_replies;
    this.score = score;
    this.your_vote = your_vote;
    this.collapsed = false;
  }

  /** @returns {string} */
  get createdDistance() {
    return isValid(this.created)
      ? formatDistance(this.created, new Date())
      : "";
  }
}
