/**
 * @property {string} host
 * @property {number} id
 * @property {boolean} local
 * @property {string} name
 * @property {string} remote_url
 */
export default class Community {
  constructor({ host, id, local, name, remote_url }) {
    this.host = host;
    this.id = id;
    this.local = local;
    this.name = name;
    this.remote_url = remote_url;
  }
}
