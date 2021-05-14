import axios from "axios";

export const signup = (body) => {
  return axios.post("/api/user", body);
};

export const login = (creds) => {
  return axios.post("/api/user/login", {}, { auth: creds });
};

export const changeLanguage = (language) => {
  axios.defaults.headers["accept-language"] = language;
};
