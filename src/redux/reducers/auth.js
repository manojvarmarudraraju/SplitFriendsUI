import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
  } from "../actions/types";
  
  const user = JSON.parse(localStorage.getItem("user"));

  const token = JSON.parse(localStorage.getItem("token"));

  const members = JSON.parse(localStorage.getItem("members"));

  const initialState = (user && token && members) ? { isLoggedIn: true, user, token, members } : { isLoggedIn: false, user: null, token: null, members: null };

  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case REGISTER_SUCCESS:
        return {
          ...state,
          isLoggedIn: false,
        };
      case REGISTER_FAIL:
        return {
          ...state,
          isLoggedIn: false,
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          isLoggedIn: true,
          members: payload.members,
          user: payload.user,
          token: payload.token,

        };
      case LOGIN_FAIL:
        return {
          ...state,
          members: null,
          isLoggedIn: false,
          user: null,
          token: null,

        };
      case LOGOUT:
        return {
          ...state,
          isLoggedIn: false,
          members: null,
          user: null,
          token: null,
        };
      default:
        return state;
    }
  }