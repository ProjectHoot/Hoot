/**
 * @property {string} username
 * @property {string} password
 * @property {string} repeatPassword
 * @property {string} email
 * @property {string} email_address;
 * @property {boolean} passwordValid
 * @property {boolean} passwordsMatch
 * @property {string[]} validationErrors
 * @property {boolean} isValid
 */
export default class RegistrationCredentials {
  constructor({ username, password, repeatPassword, email }) {
    this.username = username || "";
    this.password = password || "";
    this.repeatPassword = repeatPassword || "";
    this.email = email || "";
  }

  get email_address() {
    return this.email;
  }

  get passwordValid() {
    return this.password.length >= 6;
  }

  get passwordsMatch() {
    return this.password === this.repeatPassword;
  }

  get validationErrors() {
    // Basic form validation
    if (this.username.length < 3) {
      return ["Username must be 3 or more characters"];
    }

    if (!this.passwordValid) {
      return ["Password must be at least 6 characters"];
    }

    if (!this.passwordsMatch) {
      return ["Passwords do not match"];
    }

    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (this.email && !regex.test(this.email)) {
      return ["Email invalid"];
    }

    return [];
  }

  get isValid() {
    return this.validationErrors.length === 0;
  }
}
