export default class Author {
  constructor({ id, host, local, remote_url, username }) {
    this.id = id;
    this.host = host;
    this.local = local;
    this.remote_url = remote_url;
    this.username = username;
  }
}
