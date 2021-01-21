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
 * @property {boolean} collapsed
 */
import Author from "./author";

export default class Reply {
  constructor({ id, content_text, content_html, attachments, author, created, deleted, local, replies, has_replies, score }) {
    this.id = id;
    this.content_text = content_text;
    this.content_html = content_html;
    this.attachments = attachments;
    this.author = new Author(author);
    this.created = new Date(created);
    this.deleted = deleted;
    this.local = local;
    this.replies = replies ? replies.map(reply => new Reply(reply)) : [];
    this.has_replies = has_replies;
    this.score = score;
    this.collapsed = false;
  }
}