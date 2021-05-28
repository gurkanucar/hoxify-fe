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

export const getUsers = (page = 0, size = 3) => {
  return axios.get(`/api/user?page=${page}&size=${size}`);
};
