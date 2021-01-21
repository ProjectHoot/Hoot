/**
 * @property {number} id
 * @property {string} name
 * @property {boolean} local
 * @property {string} host
 * @property {string} remote_url
 * @property {string} description
 */
export default class Community {
  constructor({ id, name, local, host, remote_url, description }) {
    this.id = id;
    this.name = name;
    this.local = local;
    this.host = host;
    this.remote_url = remote_url;
    this.description = description;
  }
}
