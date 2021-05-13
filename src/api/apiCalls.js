import axios from "axios";

export const signup = (body) => {
  return axios.post("/api/user", body);
};
