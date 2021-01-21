import { Api } from "./api";
import LoginResponse from "@/modules/auth/models/loginResponse";

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

  logout() {
    return this.axios.post(`${this.baseUrl}/logins/~current`);
  }
})();
