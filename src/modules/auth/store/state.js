import User from "../models/user";

export default {
  user: new User({}),
  token: localStorage._token ? localStorage._token : null
};
