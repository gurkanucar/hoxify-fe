import axios from "axios";

export const signup = (body) => {
  return axios.post("/api/user", body);
};

export const login = (body) => {
  return axios.post("/api/user/login", body);
};

export const changeLanguage = (language) => {
  axios.defaults.headers["accept-language"] = language;
};
