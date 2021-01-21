import User from "./user";

/**
 * @property {string} token
 * @property {User} user
 */
export default class LoginResponse {
  constructor({ token, user }) {
    this.token = token;
    this.user = new User(user);
  }
}
