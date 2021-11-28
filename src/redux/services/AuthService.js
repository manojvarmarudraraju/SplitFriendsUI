import axios from "axios";
import AuthHeader from "./AuthHeader";

const API_URL = "http://localhost:8080/";

const USER_URL = API_URL + "user/"
const GROUP_URL = API_URL + "group/"

const register = (obj) => {
  return axios.put(USER_URL + "register", obj);
};

const login = (obj) => {
  return axios
    .post(USER_URL + "login", obj)
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
  localStorage.removeItem("member");
  localStorage.removeItem("groups");
};

const addGroup = (obj) => {
  return axios.put(GROUP_URL + "new", obj, { headers: AuthHeader() });
};

const getAllGroups = () => {
  return axios
  .get(GROUP_URL + "data", { headers: AuthHeader() })
  .then((response) => {
    if (response.data) {
      localStorage.setItem("groups", JSON.stringify(response.data));
    }
    return response.data;
  });
};

export default {
  register,
  login,
  logout,
  addGroup,
  getAllGroups,
};