import axios from "axios";

export class Api {
  constructor() {
    this.baseUrl = "https://hoot.goldandblack.xyz/api/unstable";
    this.axios = axios;
  }
}
