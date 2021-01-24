import { Api } from "./api";
import LoginResponse from "@/modules/auth/models/loginResponse";
import User from "@/modules/auth/models/user";

export default new (class Auth extends Api {
  constructor() {
    super();
  }

  /**
   * @param {LoginCredentials} credentials
   * @returns {Promise<LoginResponse>}
   * */
  login(credentials) {
    return this.axios
      .post(`${this.baseUrl}/logins`, credentials)
      .then(({ data }) => {
        return new LoginResponse(data);
      });
  }

  /**
   * @param {RegistrationCredentials} credentials
   * @returns {Promise<LoginResponse>}
   * */
  signUp(credentials) {
    return this.axios
      .post(`${this.baseUrl}/users`, credentials)
      .then(({ data }) => {
        return new LoginResponse(data);
      });
  }

  /** @returns {Promise<User>} */
  syncUser() {
    return this.axios.get(`${this.baseUrl}/users/~me`).then(({ data }) => {
      return new User(data);
    });
  }

  logout() {
    return this.axios.post(`${this.baseUrl}/logins/~current`);
  }
})();
