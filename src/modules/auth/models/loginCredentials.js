/**
 * @property {string} username
 * @property {string} password
 */
export default class LoginCredentials {
  constructor({ username, password }) {
    this.username = username;
    this.password = password;
  }
}
