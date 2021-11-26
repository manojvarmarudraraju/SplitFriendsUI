import axios from "axios";

const API_URL = "http://localhost:8080/user/";

const register = (obj) => {
  return axios.put(API_URL + "register", obj);
};

const login = (obj) => {
  return axios
    .post(API_URL + "login", obj)
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("token", JSON.stringify(response.data.token));
      }
      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

export default {
  register,
  login,
  logout,
};