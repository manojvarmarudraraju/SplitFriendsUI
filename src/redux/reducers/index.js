import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import group from "./group";

export default combineReducers({
  auth,
  message,
  group,
});