import {
  ARCH_GROUP_SUCCESS,
  ARCH_GROUP_FAILURE,
  ADD_EXP_FAILURE,
  ADD_EXP_SUCCESS,
  GROUP_ADD_FAILURE,
  GROUP_ADD_SUCCESS,
  GROUP_GET_FAILURE,
  GROUP_GET_SUCCESS,
  LOGOUT,
} from "../actions/types";

const groups = JSON.parse(localStorage.getItem("groups"));

const initialState = groups ? { groups: groups } : { groups: null };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GROUP_ADD_FAILURE:
      return {
        ...state,
      };
    case GROUP_ADD_SUCCESS:
      return {
        ...state,
      };
    case GROUP_GET_FAILURE:
      return {
        ...state,
        groups: null,
      };
    case GROUP_GET_SUCCESS:
      return {
        ...state,
        groups: payload.groups,
      };
    case ADD_EXP_FAILURE:
      return {
        ...state,
      };
    case ADD_EXP_SUCCESS:
      return {
        ...state,
      };
    case ARCH_GROUP_SUCCESS:
      return {
        ...state,
      };
    case ARCH_GROUP_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
}
