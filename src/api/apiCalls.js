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

export const getUsers = (page = 0, size = 7) => {
  return axios.get(`/api/user?page=${page}&size=${size}`);
};

export const setAuthorizationHeader = ({ username, password, isLoggedIn }) => {
  if (isLoggedIn) {
    const authorizationHeaderValue = `Basic ${btoa(username + ":" + password)}`;
    axios.defaults.headers["Authorization"] = authorizationHeaderValue;
  } else {
    delete axios.defaults.headers["Authorization"];
  }
};
