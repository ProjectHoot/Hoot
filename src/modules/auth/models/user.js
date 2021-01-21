/**
 * @property {number} id
 * @property {string} username
 * @property {boolean} has_unread_notifications
 * @property {boolean} is_site_admin
 */
export default class User {
  constructor({ id, username, has_unread_notifications, is_site_admin }) {
    this.id = id;
    this.username = username;
    this.has_unread_notifications = has_unread_notifications;
    this.is_site_admin = is_site_admin;
  }
}
